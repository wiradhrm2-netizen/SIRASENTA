/* =========================================================
   SIRASENTA
   MAIN ANALYSIS ENGINE
   File: script.js

   Alur:
   analysis.html
        ↓
   Validasi input
        ↓
   Ambil database alternatif
        ↓
   Penyesuaian karakteristik limbah
        ↓
   Penyesuaian kondisi UMKM
        ↓
   Normalisasi MCDA
        ↓
   Weighted Score
        ↓
   Ranking alternatif
        ↓
   Simpan hasil
        ↓
   result.html
========================================================= */


/* =========================================================
   1. CONFIGURATION
========================================================= */

const SIRASENTA_CONFIG = {

    storageKey:
        "sirasentaAnalysis",

    resultKey:
        "sirasentaResult",

    evaluationKey:
        "sirasentaEvaluation",

    version:
        "1.0.0"

};



/* =========================================================
   2. BASIC HELPERS
========================================================= */


/**
 * Mengambil data analisis dari localStorage.
 */
function getAnalysisData() {

    const raw =
        localStorage.getItem(
            SIRASENTA_CONFIG.storageKey
        );

    if (!raw) {

        return null;

    }

    try {

        return JSON.parse(raw);

    } catch (error) {

        console.error(
            "Gagal membaca data analisis:",
            error
        );

        return null;

    }

}



/**
 * Menyimpan data.
 */
function saveResult(data) {

    localStorage.setItem(

        SIRASENTA_CONFIG.resultKey,

        JSON.stringify(data)

    );

}



/**
 * Membatasi nilai 0–100.
 */
function clamp(value, min = 0, max = 100) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}



/**
 * Membulatkan angka.
 */
function round(value, decimals = 2) {

    const factor =
        Math.pow(10, decimals);

    return Math.round(
        value * factor
    ) / factor;

}



/**
 * Mengubah string menjadi angka.
 */
function number(value) {

    const result =
        Number(value);

    return Number.isFinite(result)
        ? result
        : 0;

}



/* =========================================================
   3. VALIDASI BOBOT
========================================================= */


/**
 * Membaca bobot MCDA.
 */
function getWeights(data) {

    const weights = {

        economic:
            number(data.weightEconomic),

        environment:
            number(data.weightEnvironment),

        technical:
            number(data.weightTechnical),

        circularity:
            number(data.weightCircularity),

        social:
            number(data.weightSocial)

    };


    const total =
        Object.values(weights)
            .reduce(
                (sum, value) =>
                    sum + value,
                0
            );


    if (total !== 100) {

        throw new Error(
            `Total bobot harus 100%. Saat ini ${total}%.`
        );

    }


    /*
     * Mengubah persen menjadi desimal.
     *
     * Contoh:
     * 25 → 0.25
     */
    Object.keys(weights).forEach(key => {

        weights[key] =
            weights[key] / 100;

    });


    return weights;

}



/* =========================================================
   4. DETEKSI KESESUAIAN LIMBAH
========================================================= */


/**
 * Menentukan apakah alternatif cocok
 * dengan jenis limbah.
 */
function calculateWasteCompatibility(
    alternative,
    wasteType
) {

    if (!wasteType) {

        return 1;

    }


    /*
     * Jika alternatif memang dirancang
     * untuk jenis limbah tersebut.
     */
    if (
        alternative.suitableWaste
            .includes(wasteType)
    ) {

        return 1.08;

    }


    /*
     * Jika tidak secara langsung cocok,
     * skor sedikit diturunkan.
     */
    return 0.82;

}



/* =========================================================
   5. PENYESUAIAN KONDISI LIMBAH
========================================================= */


/**
 * Menghitung faktor berdasarkan:
 *
 * - kadar air
 * - kandungan organik
 * - jenis limbah
 */
function calculateWasteAdjustment(
    alternative,
    data
) {

    let factor = 1;


    /*
     * Kompatibilitas jenis limbah.
     */
    factor *=
        calculateWasteCompatibility(
            alternative,
            data.wasteType
        );


    /*
     * Kadar air.
     */
    if (
        data.moisture &&
        typeof getWasteFactor === "function"
    ) {

        factor *=
            getWasteFactor(
                "moisture",
                data.moisture,
                alternative.id
            );

    }


    /*
     * Kandungan organik.
     */
    if (
        data.organicContent &&
        typeof getWasteFactor === "function"
    ) {

        factor *=
            getWasteFactor(
                "organicContent",
                data.organicContent,
                alternative.id
            );

    }


    return factor;

}



/* =========================================================
   6. PENYESUAIAN KONDISI UMKM
========================================================= */


/**
 * Faktor implementasi berdasarkan:
 *
 * - skala
 * - teknologi
 * - budget
 */
function calculateBusinessAdjustment(
    alternative,
    data
) {

    let factor = 1;


    /*
     * Skala usaha.
     */
    if (
        data.businessScale &&
        typeof getScaleFactor === "function"
    ) {

        factor *=
            getScaleFactor(
                data.businessScale,
                alternative.id
            );

    }


    /*
     * Kesiapan teknologi.
     */
    if (
        data.technology &&
        typeof getTechnologyFactor === "function"
    ) {

        factor *=
            getTechnologyFactor(
                data.technology,
                alternative.id
            );

    }


    /*
     * Kemampuan investasi.
     */
    if (
        data.budget &&
        typeof getBudgetFactor === "function"
    ) {

        factor *=
            getBudgetFactor(
                data.budget,
                alternative.id
            );

    }


    return factor;

}



/* =========================================================
   7. PENYESUAIAN LAHAN
========================================================= */


/**
 * Alternatif yang membutuhkan lahan besar
 * akan kurang cocok jika lahan terbatas.
 */
function calculateLandAdjustment(
    alternative,
    data
) {

    const land =
        data.landAvailability;


    if (!land) {

        return 1;

    }


    let factor = 1;


    if (
        alternative.id === "compost"
    ) {

        if (land === "rendah") {

            factor *= 0.88;

        }

        if (land === "tinggi") {

            factor *= 1.05;

        }

    }


    if (
        alternative.id === "biogas"
    ) {

        if (land === "rendah") {

            factor *= 0.80;

        }

        if (land === "tinggi") {

            factor *= 1.05;

        }

    }


    if (
        alternative.id === "feed"
    ) {

        factor *= 1.02;

    }


    return factor;

}



/* =========================================================
   8. PENYESUAIAN TENAGA KERJA
========================================================= */


/**
 * Alternatif dengan kebutuhan proses
 * lebih kompleks dipengaruhi oleh
 * ketersediaan SDM.
 */
function calculateHumanResourceAdjustment(
    alternative,
    data
) {

    const level =
        data.humanResource;


    if (!level) {

        return 1;

    }


    const score =
        levelToScore(level);


    let factor = 1;


    /*
     * Alternatif dengan proses teknis
     * lebih kompleks.
     */
    const complexity = {

        feed: 0.70,

        compost: 0.35,

        biogas: 0.90,

        "liquid-fertilizer": 0.50,

        "fermented-biomass": 0.55

    };


    const alternativeComplexity =
        complexity[alternative.id]
        || 0.5;


    /*
     * SDM rendah → penalti pada
     * teknologi kompleks.
     */
    const adjustment =
        1 +
        ((score - 70) / 100)
        * alternativeComplexity
        * 0.10;


    factor *= adjustment;


    return factor;

}



/* =========================================================
   9. PENYESUAIAN AKSES PASAR
========================================================= */


/**
 * Potensi pasar dapat memengaruhi
 * kelayakan ekonomi.
 */
function calculateMarketAdjustment(
    alternative,
    data
) {

    const market =
        data.marketAccess;


    if (!market) {

        return 1;

    }


    let factor = 1;


    if (market === "rendah") {

        /*
         * Produk yang memerlukan
         * pasar khusus sedikit diturunkan.
         */
        if (
            alternative.id === "feed" ||
            alternative.id === "liquid-fertilizer"
        ) {

            factor *= 0.95;

        }

    }


    if (market === "tinggi") {

        if (
            alternative.id === "feed" ||
            alternative.id === "compost" ||
            alternative.id === "liquid-fertilizer"
        ) {

            factor *= 1.04;

        }

    }


    return factor;

}



/* =========================================================
   10. CALCULATE ADJUSTED SCORES
========================================================= */


/**
 * Menghasilkan skor alternatif setelah
 * memperhitungkan kondisi pengguna.
 */
function calculateAdjustedScores(
    alternative,
    data
) {

    const base =
        alternative.baseScore;


    const wasteAdjustment =
        calculateWasteAdjustment(
            alternative,
            data
        );


    const businessAdjustment =
        calculateBusinessAdjustment(
            alternative,
            data
        );


    const landAdjustment =
        calculateLandAdjustment(
            alternative,
            data
        );


    const humanResourceAdjustment =
        calculateHumanResourceAdjustment(
            alternative,
            data
        );


    const marketAdjustment =
        calculateMarketAdjustment(
            alternative,
            data
        );


    /*
     * Faktor total.
     */
    const totalFactor =
        wasteAdjustment *
        businessAdjustment *
        landAdjustment *
        humanResourceAdjustment *
        marketAdjustment;


    /*
     * Terapkan faktor ke setiap kriteria.
     *
     * Tidak semua kriteria harus
     * dipengaruhi sama kuat.
     */
    const scores = {

        economic:
            clamp(
                base.economic *
                (
                    1 +
                    (totalFactor - 1)
                    * 0.80
                )
            ),

        environment:
            clamp(
                base.environment *
                (
                    1 +
                    (wasteAdjustment - 1)
                    * 0.90
                )
            ),

        technical:
            clamp(
                base.technical *
                (
                    1 +
                    (
                        businessAdjustment - 1
                    ) * 0.90
                )
            ),

        circularity:
            clamp(
                base.circularity *
                (
                    1 +
                    (
                        wasteAdjustment - 1
                    ) * 0.75
                )
            ),

        social:
            clamp(
                base.social *
                (
                    1 +
                    (
                        humanResourceAdjustment - 1
                    ) * 0.50
                )
            )

    };


    return {

        baseScores: {
            ...base
        },

        adjustedScores: {

            economic:
                round(scores.economic),

            environment:
                round(scores.environment),

            technical:
                round(scores.technical),

            circularity:
                round(scores.circularity),

            social:
                round(scores.social)

        },

        factors: {

            waste:
                round(wasteAdjustment, 4),

            business:
                round(businessAdjustment, 4),

            land:
                round(landAdjustment, 4),

            humanResource:
                round(humanResourceAdjustment, 4),

            market:
                round(marketAdjustment, 4),

            total:
                round(totalFactor, 4)

        }

    };

}



/* =========================================================
   11. NORMALISASI MCDA
========================================================= */


/**
 * Normalisasi nilai setiap alternatif.
 *
 * Karena semua kriteria yang digunakan
 * bersifat benefit:
 *
 * normalized =
 * value / maximum value
 */
function normalizeScores(
    alternatives
) {

    const criteria = [
        "economic",
        "environment",
        "technical",
        "circularity",
        "social"
    ];


    const maxima = {};


    /*
     * Cari nilai maksimum tiap kriteria.
     */
    criteria.forEach(criteriaId => {

        maxima[criteriaId] =
            Math.max(
                ...alternatives.map(
                    item =>
                        item.adjustedScores[
                            criteriaId
                        ]
                )
            );

    });


    /*
     * Normalisasi.
     */
    return alternatives.map(item => {

        const normalized = {};


        criteria.forEach(criteriaId => {

            const value =
                item.adjustedScores[
                    criteriaId
                ];


            const max =
                maxima[criteriaId];


            normalized[criteriaId] =
                max === 0
                    ? 0
                    : value / max;

        });


        return {

            ...item,

            normalizedScores:
                normalized

        };

    });

}



/* =========================================================
   12. WEIGHTED MCDA
========================================================= */


/**
 * Menghitung final weighted score.
 */
function calculateWeightedScore(
    alternatives,
    weights
) {

    return alternatives.map(item => {

        let finalScore = 0;


        const weighted = {};


        Object.keys(weights)
            .forEach(criteriaId => {

                const normalized =
                    item.normalizedScores[
                        criteriaId
                    ];


                const weight =
                    weights[criteriaId];


                const contribution =
                    normalized *
                    weight;


                weighted[criteriaId] =
                    contribution;


                finalScore +=
                    contribution;

            });


        return {

            ...item,

            weightedScores:
                weighted,

            finalScore:
                round(
                    finalScore * 100,
                    2
                )

        };

    });

}



/* =========================================================
   13. RANKING
========================================================= */


/**
 * Mengurutkan alternatif berdasarkan
 * skor terbesar.
 */
function rankAlternatives(
    alternatives
) {

    const sorted =
        [...alternatives]
            .sort(
                (a, b) =>
                    b.finalScore -
                    a.finalScore
            );


    return sorted.map(
        (item, index) => ({

            ...item,

            rank:
                index + 1

        })
    );

}



/* =========================================================
   14. CONFIDENCE SCORE
========================================================= */


/**
 * Menghitung tingkat keyakinan rekomendasi.
 *
 * Ini bukan probabilitas statistik.
 * Nilainya merupakan indikator internal
 * berdasarkan:
 *
 * - gap ranking pertama dan kedua
 * - kelengkapan input
 * - kompatibilitas limbah
 */
function calculateConfidence(
    rankedAlternatives,
    data
) {

    if (
        rankedAlternatives.length < 2
    ) {

        return 0;

    }


    const first =
        rankedAlternatives[0];


    const second =
        rankedAlternatives[1];


    const scoreGap =
        first.finalScore -
        second.finalScore;


    /*
     * Komponen gap.
     */
    const gapScore =
        clamp(
            50 +
            scoreGap * 4,
            0,
            100
        );


    /*
     * Kelengkapan input.
     */
    const requiredFields = [

        "businessName",

        "businessType",

        "businessScale",

        "wasteType",

        "wasteVolume",

        "moisture",

        "organicContent",

        "landAvailability",

        "budget",

        "technology"

    ];


    let filled = 0;


    requiredFields.forEach(field => {

        if (
            data[field] !== undefined &&
            data[field] !== null &&
            data[field] !== ""
        ) {

            filled++;

        }

    });


    const completeness =
        (
            filled /
            requiredFields.length
        ) * 100;


    /*
     * Gabungan indikator.
     */
    const confidence =
        (
            gapScore * 0.60
        ) +
        (
            completeness * 0.40
        );


    return round(
        clamp(
            confidence,
            0,
            100
        )
    );

}



/* =========================================================
   15. RECOMMENDATION LEVEL
========================================================= */


/**
 * Mengubah skor menjadi level rekomendasi.
 */
function getRecommendationLevel(
    score
) {

    if (score >= 85) {

        return {

            level: "Sangat Direkomendasikan",

            color: "green",

            description:
                "Alternatif menunjukkan tingkat kesesuaian yang sangat tinggi berdasarkan parameter sistem."

        };

    }


    if (score >= 75) {

        return {

            level: "Direkomendasikan",

            color: "blue",

            description:
                "Alternatif memiliki kesesuaian yang baik dan layak dipertimbangkan."

        };

    }


    if (score >= 65) {

        return {

            level: "Cukup Direkomendasikan",

            color: "yellow",

            description:
                "Alternatif memiliki potensi, tetapi membutuhkan perhatian terhadap beberapa faktor implementasi."

        };

    }


    return {

        level: "Perlu Evaluasi Lanjutan",

        color: "red",

        description:
            "Alternatif membutuhkan validasi teknis dan ekonomi lebih lanjut."

    };

}



/* =========================================================
   16. GENERATE RECOMMENDATION
========================================================= */


/**
 * Membuat rekomendasi utama.
 */
function generateRecommendation(
    rankedAlternatives,
    data
) {

    const winner =
        rankedAlternatives[0];


    if (!winner) {

        return null;

    }


    const level =
        getRecommendationLevel(
            winner.finalScore
        );


    /*
     * Cari alasan utama.
     */
    const scoreEntries =
        Object.entries(
            winner.adjustedScores
        );


    scoreEntries.sort(
        (a, b) =>
            b[1] - a[1]
    );


    const strongestCriteria =
        scoreEntries
            .slice(0, 3)
            .map(
                item => item[0]
            );


    const criteriaNames = {

        economic:
            "efisiensi ekonomi",

        environment:
            "dampak lingkungan",

        technical:
            "kelayakan teknis",

        circularity:
            "sirkularitas",

        social:
            "dampak sosial"

    };


    const reasons =
        strongestCriteria.map(
            criteria =>
                criteriaNames[criteria]
        );


    return {

        alternativeId:
            winner.id,

        alternativeName:
            winner.name,

        score:
            winner.finalScore,

        rank:
            winner.rank,

        level:
            level.level,

        color:
            level.color,

        description:
            level.description,

        reasons,

        explanation:
            `${winner.name} memperoleh skor tertinggi sebesar ${winner.finalScore}/100. Faktor yang paling mendukung rekomendasi adalah ${reasons.join(", ")}.`

    };

}



/* =========================================================
   17. BUILD ANALYSIS RESULT
========================================================= */


/**
 * Fungsi utama mesin SIRASENTA.
 */
function runSirasentaAnalysis(
    data
) {

    /*
     * 1. Validasi.
     */
    if (!data) {

        throw new Error(
            "Data analisis tidak ditemukan."
        );

    }


    /*
     * 2. Bobot.
     */
    const weights =
        getWeights(data);


    /*
     * 3. Ambil alternatif.
     */
    let alternatives =
        getAlternatives();


    /*
     * 4. Hitung adjusted score.
     */
    alternatives =
        alternatives.map(
            alternative => {

                const calculation =
                    calculateAdjustedScores(
                        alternative,
                        data
                    );


                return {

                    ...alternative,

                    baseScores:
                        calculation.baseScores,

                    adjustedScores:
                        calculation.adjustedScores,

                    adjustmentFactors:
                        calculation.factors

                };

            }
        );


    /*
     * 5. Normalisasi.
     */
    alternatives =
        normalizeScores(
            alternatives
        );


    /*
     * 6. Weighted score.
     */
    alternatives =
        calculateWeightedScore(
            alternatives,
            weights
        );


    /*
     * 7. Ranking.
     */
    alternatives =
        rankAlternatives(
            alternatives
        );


    /*
     * 8. Confidence.
     */
    const confidence =
        calculateConfidence(
            alternatives,
            data
        );


    /*
     * 9. Recommendation.
     */
    const recommendation =
        generateRecommendation(
            alternatives,
            data
        );


    /*
     * 10. Timestamp.
     */
    const timestamp =
        new Date().toISOString();


    /*
     * 11. Final result.
     */
    const result = {

        meta: {

            system:
                SIRASENTA_DATABASE.system.name,

            version:
                SIRASENTA_CONFIG.version,

            method:
                SIRASENTA_DATABASE.system.method,

            timestamp

        },


        input: {

            ...data

        },


        weights: {

            economic:
                round(weights.economic * 100),

            environment:
                round(weights.environment * 100),

            technical:
                round(weights.technical * 100),

            circularity:
                round(weights.circularity * 100),

            social:
                round(weights.social * 100)

        },


        confidence,


        recommendation,


        ranking:
            alternatives.map(
                item => ({

                    id:
                        item.id,

                    code:
                        item.code,

                    name:
                        item.name,

                    category:
                        item.category,

                    icon:
                        item.icon,

                    rank:
                        item.rank,

                    finalScore:
                        item.finalScore,

                    adjustedScores:
                        item.adjustedScores,

                    normalizedScores:
                        item.normalizedScores,

                    weightedScores:
                        item.weightedScores,

                    adjustmentFactors:
                        item.adjustmentFactors,

                    evidence:
                        item.evidence,

                    requirements:
                        item.requirements,

                    risks:
                        item.risks,

                    process:
                        item.process

                })
            )

    };


    return result;

}



/* =========================================================
   18. RUN FROM ANALYSIS PAGE
========================================================= */


/**
 * Jalankan mesin ketika analysis.html dibuka.
 */
function initializeAnalysisPage() {

    const form =
        document.getElementById(
            "analysisForm"
        );


    /*
     * Jika bukan halaman analysis,
     * hentikan.
     */
    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            try {

                /*
                 * Ambil FormData.
                 */
                const formData =
                    new FormData(form);


                const data =
                    Object.fromEntries(
                        formData.entries()
                    );


                /*
                 * Bobot harus valid.
                 */
                const weights =
                    getWeights(data);


                if (!weights) {

                    throw new Error(
                        "Bobot tidak valid."
                    );

                }


                /*
                 * Jalankan analisis.
                 */
                const result =
                    runSirasentaAnalysis(
                        data
                    );


                /*
                 * Simpan input.
                 */
                localStorage.setItem(

                    SIRASENTA_CONFIG.storageKey,

                    JSON.stringify(data)

                );


                /*
                 * Simpan hasil.
                 */
                saveResult(
                    result
                );


                /*
                 * Arahkan ke hasil.
                 */
                window.location.href =
                    "result.html";


            } catch (error) {

                console.error(
                    error
                );


                alert(
                    error.message ||
                    "Terjadi kesalahan saat melakukan analisis."
                );

            }

        }
    );

}



/* =========================================================
   19. RESULT HELPERS
========================================================= */


/**
 * Mengambil hasil analisis terakhir.
 */
function getLatestResult() {

    const raw =
        localStorage.getItem(
            SIRASENTA_CONFIG.resultKey
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(raw);

    } catch (error) {

        console.error(
            "Gagal membaca hasil:",
            error
        );

        return null;

    }

}



/**
 * Mengambil alternatif pemenang.
 */
function getWinner() {

    const result =
        getLatestResult();


    if (
        !result ||
        !result.ranking ||
        !result.ranking.length
    ) {

        return null;

    }


    return result.ranking[0];

}



/* =========================================================
   20. EVALUATION DATA
========================================================= */


/**
 * Menyimpan data evaluasi.
 *
 * Dipakai oleh evaluation.html.
 */
function saveEvaluation(
    evaluationData
) {

    const result =
        getLatestResult();


    const evaluation = {

        createdAt:
            new Date().toISOString(),

        analysisTimestamp:
            result?.meta?.timestamp || null,

        winner:
            result?.recommendation || null,

        data:
            evaluationData

    };


    localStorage.setItem(

        SIRASENTA_CONFIG.evaluationKey,

        JSON.stringify(evaluation)

    );


    return evaluation;

}



/**
 * Mengambil evaluasi terakhir.
 */
function getEvaluation() {

    const raw =
        localStorage.getItem(
            SIRASENTA_CONFIG.evaluationKey
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(raw);

    } catch (error) {

        return null;

    }

}



/* =========================================================
   21. EXPORT GLOBAL
========================================================= */

window.SIRASENTA_CONFIG =
    SIRASENTA_CONFIG;


window.getAnalysisData =
    getAnalysisData;


window.saveResult =
    saveResult;


window.runSirasentaAnalysis =
    runSirasentaAnalysis;


window.getLatestResult =
    getLatestResult;


window.getWinner =
    getWinner;


window.saveEvaluation =
    saveEvaluation;


window.getEvaluation =
    getEvaluation;



/* =========================================================
   22. INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeAnalysisPage();

    }
);
