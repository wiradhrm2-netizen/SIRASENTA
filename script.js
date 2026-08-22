/*
=========================================================
SIRASENTA ENGINE
MCDA + LocalStorage
=========================================================
*/


/* ======================================================
   KONFIGURASI
====================================================== */

const STORAGE_INPUT =
    "sirasenta_input";

const STORAGE_RESULT =
    "sirasenta_result";

const STORAGE_EVALUATION =
    "sirasenta_evaluation";



/* ======================================================
   LEVEL → SCORE
====================================================== */

function levelToScore(value) {

    const scores = {

        rendah: 40,

        sedang: 70,

        tinggi: 100

    };

    return scores[value] || 70;

}



/* ======================================================
   WASTE FACTOR
====================================================== */

function getWasteFactor(
    wasteType
) {

    const factors = {

        "ampas-tahu": 1.00,

        "kulit-kedelai": 0.95,

        "air-limbah-tahu": 0.80,

        "campuran": 0.90

    };

    return factors[wasteType] || 0.90;

}



/* ======================================================
   SCALE FACTOR
====================================================== */

function getScaleFactor(
    scale
) {

    const factors = {

        kecil: 0.95,

        menengah: 1.00,

        besar: 1.05

    };

    return factors[scale] || 1;

}



/* ======================================================
   TECHNOLOGY FACTOR
====================================================== */

function getTechnologyFactor(
    technology
) {

    const factors = {

        rendah: 0.90,

        sedang: 1.00,

        tinggi: 1.05

    };

    return factors[technology] || 1;

}



/* ======================================================
   BUDGET FACTOR
====================================================== */

function getBudgetFactor(
    budget
) {

    const factors = {

        rendah: 0.90,

        sedang: 1.00,

        tinggi: 1.05

    };

    return factors[budget] || 1;

}



/* ======================================================
   NORMALIZE WEIGHT
====================================================== */

function normalizeWeights(
    data
) {

    let weights = {

        economic:
            Number(
                data.weightEconomic
            ) || 25,

        environment:
            Number(
                data.weightEnvironment
            ) || 25,

        technical:
            Number(
                data.weightTechnical
            ) || 20,

        circularity:
            Number(
                data.weightCircularity
            ) || 20,

        social:
            Number(
                data.weightSocial
            ) || 10

    };


    const total =
        Object.values(weights)
            .reduce(
                (sum, value) =>
                    sum + value,
                0
            );


    if (total <= 0) {

        return {

            economic: 0.25,

            environment: 0.25,

            technical: 0.20,

            circularity: 0.20,

            social: 0.10

        };

    }


    return {

        economic:
            weights.economic / total,

        environment:
            weights.environment / total,

        technical:
            weights.technical / total,

        circularity:
            weights.circularity / total,

        social:
            weights.social / total

    };

}



/* ======================================================
   CALCULATE ALTERNATIVE
====================================================== */

function calculateAlternative(
    alternative,
    input,
    weights
) {

    const base =
        alternative.scores;


    /*
    Penyesuaian berdasarkan
    karakteristik UMKM.
    */

    let technicalAdjustment = 1;

    let economicAdjustment = 1;


    /*
    Teknologi rendah
    kurang cocok untuk
    solusi kompleks.
    */

    if (
        input.technology === "rendah"
    ) {

        if (
            alternative.requirements
                .technology === "tinggi"
        ) {

            technicalAdjustment =
                0.82;

        }

        else if (
            alternative.requirements
                .technology === "sedang"
        ) {

            technicalAdjustment =
                0.93;

        }

    }


    /*
    Budget rendah.
    */

    if (
        input.budget === "rendah"
    ) {

        if (
            alternative.requirements
                .budget === "tinggi"
        ) {

            economicAdjustment =
                0.80;

        }

        else if (
            alternative.requirements
                .budget === "sedang"
        ) {

            economicAdjustment =
                0.93;

        }

    }


    /*
    Lahan terbatas.
    */

    let landAdjustment = 1;


    if (
        input.landAvailability === "rendah" &&
        alternative.requirements.land === "sedang"
    ) {

        landAdjustment = 0.92;

    }


    /*
    Waste factor.
    */

    const wasteFactor =
        getWasteFactor(
            input.wasteType
        );


    /*
    Volume.
    */

    const volume =
        Number(
            input.wasteVolume
        ) || 0;


    let volumeFactor = 1;


    if (volume < 25) {

        volumeFactor = 0.94;

    }

    else if (volume >= 100) {

        volumeFactor = 1.03;

    }


    /*
    Final score setiap kriteria.
    */

    const adjustedScores = {

        economic:
            Math.min(
                100,
                Math.round(
                    base.economic *
                    economicAdjustment *
                    volumeFactor
                )
            ),

        environment:
            Math.min(
                100,
                Math.round(
                    base.environment *
                    wasteFactor
                )
            ),

        technical:
            Math.min(
                100,
                Math.round(
                    base.technical *
                    technicalAdjustment *
                    landAdjustment
                )
            ),

        circularity:
            Math.min(
                100,
                Math.round(
                    base.circularity *
                    wasteFactor
                )
            ),

        social:
            Math.min(
                100,
                Math.round(
                    base.social *
                    getScaleFactor(
                        input.businessScale
                    )
                )
            )

    };


    /*
    Weighted Sum Model.
    */

    const finalScore = Math.round(

        (
            adjustedScores.economic *
            weights.economic

        ) +

        (
            adjustedScores.environment *
            weights.environment

        ) +

        (
            adjustedScores.technical *
            weights.technical

        ) +

        (
            adjustedScores.circularity *
            weights.circularity

        ) +

        (
            adjustedScores.social *
            weights.social

        )

    );


    return {

        ...alternative,

        adjustedScores,

        finalScore

    };

}



/* ======================================================
   RUN MCDA
====================================================== */

function runMCDA(
    input
) {

    const alternatives =
        getAlternatives();


    const weights =
        normalizeWeights(
            input
        );


    let ranking =
        alternatives.map(
            alternative =>

                calculateAlternative(
                    alternative,
                    input,
                    weights
                )

        );


    /*
    Sort highest score.
    */

    ranking.sort(
        (a, b) =>
            b.finalScore -
            a.finalScore
    );


    /*
    Tambahkan ranking.
    */

    ranking =
        ranking.map(
            (item, index) => ({

                ...item,

                rank:
                    index + 1

            })
        );


    const winner =
        ranking[0];


    /*
    Confidence sederhana berdasarkan
    selisih winner dengan runner-up.
    */

    const difference =
        winner.finalScore -
        (
            ranking[1]
                ?.finalScore || 0
        );


    const confidence =
        Math.min(
            98,
            Math.max(
                60,
                Math.round(
                    75 + difference * 1.5
                )
            )
        );


    const result = {

        timestamp:
            new Date().toISOString(),

        input,

        weights,

        ranking,

        confidence,

        recommendation: {

            alternativeId:
                winner.id,

            alternativeName:
                winner.name,

            score:
                winner.finalScore,

            rank:
                winner.rank,

            level:
                getRecommendationLevel(
                    winner.finalScore
                ),

            explanation:
                generateExplanation(
                    winner,
                    input
                )

        }

    };


    return result;

}



/* ======================================================
   RECOMMENDATION LEVEL
====================================================== */

function getRecommendationLevel(
    score
) {

    if (score >= 85) {

        return "Sangat Direkomendasikan";

    }

    if (score >= 75) {

        return "Direkomendasikan";

    }

    if (score >= 65) {

        return "Cukup Direkomendasikan";

    }

    return "Perlu Kajian Lebih Lanjut";

}



/* ======================================================
   EXPLANATION
====================================================== */

function generateExplanation(
    winner,
    input
) {

    const scores =
        winner.adjustedScores;


    const highest =
        Object.entries(scores)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )[0];


    const criteriaName = {

        economic:
            "ekonomi",

        environment:
            "lingkungan",

        technical:
            "teknis",

        circularity:
            "sirkularitas",

        social:
            "sosial"

    };


    return `${winner.name} memperoleh skor tertinggi sebesar ${winner.finalScore}/100. Kinerja terbaik terutama didukung oleh aspek ${criteriaName[highest[0]]} dengan skor ${highest[1]}/100, sehingga alternatif ini menjadi pilihan paling sesuai berdasarkan bobot dan karakteristik data yang dimasukkan.`;

}



/* ======================================================
   SAVE RESULT
====================================================== */

function saveResult(
    result
) {

    localStorage.setItem(

        STORAGE_RESULT,

        JSON.stringify(
            result
        )

    );

}



/* ======================================================
   GET RESULT
====================================================== */

function getLatestResult() {

    const raw =
        localStorage.getItem(
            STORAGE_RESULT
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(
            raw
        );

    }

    catch (error) {

        console.error(
            "Result tidak valid:",
            error
        );

        return null;

    }

}



/* ======================================================
   SAVE INPUT
====================================================== */

function saveInput(
    input
) {

    localStorage.setItem(

        STORAGE_INPUT,

        JSON.stringify(
            input
        )

    );

}



/* ======================================================
   GET INPUT
====================================================== */

function getLatestInput() {

    const raw =
        localStorage.getItem(
            STORAGE_INPUT
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(
            raw
        );

    }

    catch {

        return null;

    }

}



/* ======================================================
   SAVE EVALUATION
====================================================== */

function saveEvaluation(
    evaluation
) {

    const result =
        getLatestResult();


    const finalData = {

        ...evaluation,

        recommendation:
            result
                ?.recommendation
                ?.alternativeName
                || "-",

        recommendationScore:
            result
                ?.recommendation
                ?.score
                || 0,

        timestamp:
            new Date().toISOString()

    };


    localStorage.setItem(

        STORAGE_EVALUATION,

        JSON.stringify(
            finalData
        )

    );

}



/* ======================================================
   GET EVALUATION
====================================================== */

function getLatestEvaluation() {

    const raw =
        localStorage.getItem(
            STORAGE_EVALUATION
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(
            raw
        );

    }

    catch {

        return null;

    }

}



/* ======================================================
   ANALYSIS FORM
====================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const form =
            document.getElementById(
                "analysisForm"
            );


        if (!form) {

            return;

        }


        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                const formData =
                    new FormData(
                        form
                    );


                const input =
                    Object.fromEntries(
                        formData.entries()
                    );


                /*
                Validasi bobot.
                */

                const weightTotal =

                    (
                        Number(
                            input.weightEconomic
                        ) || 0
                    ) +

                    (
                        Number(
                            input.weightEnvironment
                        ) || 0
                    ) +

                    (
                        Number(
                            input.weightTechnical
                        ) || 0
                    ) +

                    (
                        Number(
                            input.weightCircularity
                        ) || 0
                    ) +

                    (
                        Number(
                            input.weightSocial
                        ) || 0
                    );


                if (
                    weightTotal !== 100
                ) {

                    alert(
                        `Total bobot harus 100%. Saat ini ${weightTotal}%.`
                    );

                    return;

                }


                /*
                Simpan input.
                */

                saveInput(
                    input
                );


                /*
                Jalankan MCDA.
                */

                const result =
                    runMCDA(
                        input
                    );


                /*
                Simpan hasil.
                */

                saveResult(
                    result
                );


                /*
                Pindah ke result.
                */

                window.location.href =
                    "result.html";

            }
        );

    }
);
