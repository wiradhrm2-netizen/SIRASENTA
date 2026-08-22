/* =========================================================
   SIRASENTA
   Smart Waste Decision System
   Core MCDA Engine
========================================================= */


/* =========================================================
   DATABASE ALTERNATIF
========================================================= */

const SIRASENTA_ALTERNATIVES = [

    {
        id: "pakan-fermentasi",

        name: "Pakan Ternak Fermentasi",

        category: "Biokonversi",

        icon: "🐄",

        scores: {
            economic: 88,
            environment: 94,
            technical: 78,
            circularity: 97,
            social: 89
        },

        requirements: {
            budget: "sedang",
            technology: "sedang",
            land: "rendah"
        },

        description:
            "Pemanfaatan residu organik sebagai bahan pakan melalui proses pengolahan dan fermentasi.",

        process: [
            "Pemilahan bahan baku",
            "Pengurangan kadar air",
            "Pencacahan",
            "Fermentasi",
            "Pengeringan",
            "Validasi kualitas dan keamanan",
            "Pemanfaatan sebagai pakan"
        ],

        risks: [
            "Kandungan nutrisi harus divalidasi.",
            "Bahan harus bebas dari kontaminan berbahaya.",
            "Kadar air dan penyimpanan perlu dikontrol."
        ],

        evidence: [
            {
                title:
                    "Soybean curd residue as a potential feed resource",

                journal:
                    "Waste Management & Research",

                year:
                    2020,

                relevance:
                    "Residu pengolahan kedelai seperti ampas tahu berpotensi dimanfaatkan sebagai sumber bahan pakan setelah melalui pengolahan yang sesuai."
            }
        ]
    },


    {
        id: "kompos",

        name: "Kompos Organik",

        category: "Daur Ulang Organik",

        icon: "🌱",

        scores: {
            economic: 75,
            environment: 96,
            technical: 90,
            circularity: 92,
            social: 85
        },

        requirements: {
            budget: "rendah",
            technology: "rendah",
            land: "sedang"
        },

        description:
            "Pengolahan limbah organik menjadi kompos untuk meningkatkan pemanfaatan kembali sumber daya organik.",

        process: [
            "Pemilahan",
            "Pencacahan",
            "Pencampuran",
            "Dekomposisi",
            "Pematangan",
            "Pengemasan"
        ],

        risks: [
            "Membutuhkan area pengomposan.",
            "Kadar air perlu dikontrol.",
            "Proses membutuhkan waktu pematangan."
        ],

        evidence: [
            {
                title:
                    "Composting of organic waste and resource recovery",

                journal:
                    "Bioresource Technology",

                year:
                    2020,

                relevance:
                    "Pengomposan merupakan salah satu pendekatan pemulihan sumber daya dari limbah organik."
            }
        ]
    },


    {
        id: "biogas",

        name: "Produksi Biogas",

        category: "Energi Terbarukan",

        icon: "⚡",

        scores: {
            economic: 82,
            environment: 95,
            technical: 70,
            circularity: 94,
            social: 80
        },

        requirements: {
            budget: "tinggi",
            technology: "tinggi",
            land: "sedang"
        },

        description:
            "Konversi limbah organik melalui proses anaerobic digestion untuk menghasilkan biogas sebagai sumber energi alternatif.",

        process: [
            "Pengumpulan limbah",
            "Pra-pengolahan",
            "Pengisian digester",
            "Anaerobic digestion",
            "Pengumpulan biogas",
            "Pemanfaatan energi"
        ],

        risks: [
            "Investasi awal relatif tinggi.",
            "Membutuhkan instalasi digester.",
            "Parameter proses harus dikontrol."
        ],

        evidence: [
            {
                title:
                    "Anaerobic digestion of agro-industrial waste",

                journal:
                    "Renewable Energy",

                year:
                    2021,

                relevance:
                    "Anaerobic digestion dapat digunakan untuk memulihkan energi dari berbagai jenis limbah organik."
            }
        ]
    },


    {
        id: "briket",

        name: "Briket Biomassa",

        category: "Energi Biomassa",

        icon: "🔥",

        scores: {
            economic: 80,
            environment: 84,
            technical: 78,
            circularity: 87,
            social: 81
        },

        requirements: {
            budget: "sedang",
            technology: "sedang",
            land: "rendah"
        },

        description:
            "Konversi biomassa kering menjadi bahan bakar padat alternatif melalui proses pengeringan, penghalusan dan pemadatan.",

        process: [
            "Pemilahan biomassa",
            "Pengeringan",
            "Penghalusan",
            "Pencampuran bahan",
            "Pencetakan",
            "Pengeringan akhir"
        ],

        risks: [
            "Kadar air harus dikontrol.",
            "Membutuhkan mesin pencetak.",
            "Kualitas bahan bakar perlu diuji."
        ],

        evidence: [
            {
                title:
                    "Biomass waste conversion into solid fuel",

                journal:
                    "Renewable and Sustainable Energy Reviews",

                year:
                    2020,

                relevance:
                    "Biomassa residu dapat dikonversi menjadi bahan bakar padat untuk meningkatkan nilai guna limbah."
            }
        ]
    },


    {
        id: "pupuk-cair",

        name: "Pupuk Organik Cair",

        category: "Bioproses",

        icon: "💧",

        scores: {
            economic: 83,
            environment: 90,
            technical: 84,
            circularity: 91,
            social: 87
        },

        requirements: {
            budget: "rendah",
            technology: "sedang",
            land: "rendah"
        },

        description:
            "Pengolahan bahan organik melalui fermentasi menjadi pupuk organik cair.",

        process: [
            "Pemisahan bahan",
            "Pencacahan",
            "Pencampuran",
            "Fermentasi",
            "Penyaringan",
            "Pengujian kualitas"
        ],

        risks: [
            "Kualitas dipengaruhi kondisi fermentasi.",
            "Pengendalian bau diperlukan.",
            "Produk perlu diuji sebelum digunakan."
        ],

        evidence: [
            {
                title:
                    "Organic waste valorization through liquid fertilizer production",

                journal:
                    "Journal of Environmental Management",

                year:
                    2021,

                relevance:
                    "Fermentasi limbah organik dapat menghasilkan produk bernilai guna seperti pupuk organik cair."
            }
        ]
    }

];



/* =========================================================
   GET FORM DATA
========================================================= */

function getAnalysisInput() {

    const form =
        document.getElementById("analysisForm");

    if (!form) {
        return null;
    }

    const formData =
        new FormData(form);

    return Object.fromEntries(
        formData.entries()
    );
}



/* =========================================================
   CALCULATE MCDA
========================================================= */

function calculateMCDA(input) {

    const weights = {

        economic:
            Number(input.weightEconomic || 0) / 100,

        environment:
            Number(input.weightEnvironment || 0) / 100,

        technical:
            Number(input.weightTechnical || 0) / 100,

        circularity:
            Number(input.weightCircularity || 0) / 100,

        social:
            Number(input.weightSocial || 0) / 100

    };


    const ranking =
        SIRASENTA_ALTERNATIVES.map(
            alternative => {

                const scores = {
                    ...alternative.scores
                };


                /* =====================================
                   KONDISI INVESTASI
                ===================================== */

                if (
                    input.budget === "rendah" &&
                    alternative.requirements.budget === "tinggi"
                ) {

                    scores.economic -= 15;
                    scores.technical -= 5;

                }


                if (
                    input.budget === "rendah" &&
                    alternative.requirements.budget === "sedang"
                ) {

                    scores.economic -= 5;

                }


                /* =====================================
                   KESIAPAN TEKNOLOGI
                ===================================== */

                if (
                    input.technology === "rendah" &&
                    alternative.requirements.technology === "tinggi"
                ) {

                    scores.technical -= 15;

                }


                if (
                    input.technology === "rendah" &&
                    alternative.requirements.technology === "sedang"
                ) {

                    scores.technical -= 5;

                }


                /* =====================================
                   LAHAN
                ===================================== */

                if (
                    input.landAvailability === "rendah" &&
                    alternative.requirements.land === "sedang"
                ) {

                    scores.technical -= 8;

                }


                /* =====================================
                   AMPAS TAHU
                ===================================== */

                if (
                    input.wasteType === "ampas-tahu" &&
                    alternative.id === "pakan-fermentasi"
                ) {

                    scores.circularity += 5;
                    scores.economic += 3;

                }


                /* =====================================
                   AIR LIMBAH TAHU
                ===================================== */

                if (
                    input.wasteType === "air-limbah-tahu"
                ) {

                    if (
                        alternative.id === "biogas"
                    ) {

                        scores.environment += 5;

                    }


                    if (
                        alternative.id === "briket"
                    ) {

                        scores.technical -= 15;

                    }

                }


                /* =====================================
                   ORGANIK TINGGI
                ===================================== */

                if (
                    input.organicContent === "tinggi"
                ) {

                    if (
                        alternative.id === "pakan-fermentasi"
                    ) {

                        scores.circularity += 3;

                    }


                    if (
                        alternative.id === "biogas"
                    ) {

                        scores.environment += 3;

                    }

                }


                /* =====================================
                   KADAR AIR
                ===================================== */

                if (
                    input.moisture === "tinggi"
                ) {

                    if (
                        alternative.id === "briket"
                    ) {

                        scores.technical -= 10;

                    }


                    if (
                        alternative.id === "biogas"
                    ) {

                        scores.technical += 4;

                    }

                }


                /* =====================================
                   KONTAMINASI
                ===================================== */

                if (
                    input.wasteCondition ===
                    "terkontaminasi"
                ) {

                    if (
                        alternative.id ===
                        "pakan-fermentasi"
                    ) {

                        scores.technical -= 20;
                        scores.social -= 10;

                    }

                }


                /* =====================================
                   NORMALISASI
                ===================================== */

                Object.keys(scores).forEach(
                    key => {

                        scores[key] =
                            Math.max(
                                0,
                                Math.min(
                                    100,
                                    scores[key]
                                )
                            );

                    }
                );


                /* =====================================
                   WEIGHTED SUM MODEL
                ===================================== */

                const finalScore = Math.round(

                    scores.economic *
                    weights.economic

                    +

                    scores.environment *
                    weights.environment

                    +

                    scores.technical *
                    weights.technical

                    +

                    scores.circularity *
                    weights.circularity

                    +

                    scores.social *
                    weights.social

                );


                return {

                    ...alternative,

                    adjustedScores:
                        scores,

                    finalScore:
                        finalScore

                };

            }
        );


    /* =============================================
       SORTING
    ============================================= */

    ranking.sort(
        (a, b) =>
            b.finalScore -
            a.finalScore
    );


    /* =============================================
       RANK
    ============================================= */

    ranking.forEach(
        (item, index) => {

            item.rank =
                index + 1;

        }
    );


    return {

        weights,

        ranking

    };

}



/* =========================================================
   GENERATE RESULT
========================================================= */

function generateResult(input) {

    const mcda =
        calculateMCDA(input);


    const winner =
        mcda.ranking[0];


    const second =
        mcda.ranking[1];


    const difference =
        winner.finalScore -
        second.finalScore;


    let confidence =
        75 + difference;


    confidence =
        Math.max(
            70,
            Math.min(
                98,
                confidence
            )
        );


    let level;


    if (
        winner.finalScore >= 85
    ) {

        level =
            "Sangat Direkomendasikan";

    }

    else if (
        winner.finalScore >= 75
    ) {

        level =
            "Direkomendasikan";

    }

    else if (
        winner.finalScore >= 65
    ) {

        level =
            "Cukup Direkomendasikan";

    }

    else {

        level =
            "Perlu Kajian Lebih Lanjut";

    }


    return {

        timestamp:
            new Date().toISOString(),

        input:
            input,

        weights:
            mcda.weights,

        confidence:
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
                level,

            explanation:
                `${winner.name} memperoleh skor tertinggi sebesar ${winner.finalScore}/100 berdasarkan pembobotan MCDA terhadap aspek ekonomi, lingkungan, teknis, sirkularitas, dan sosial.`

        },

        ranking:
            mcda.ranking

    };

}



/* =========================================================
   SAVE RESULT
========================================================= */

function saveResult(result) {

    localStorage.setItem(
        "sirasenta_result",
        JSON.stringify(result)
    );


    /*
       Key lama tetap disimpan
       agar kompatibel dengan sistem sebelumnya.
    */

    localStorage.setItem(
        "sirasentaAnalysis",
        JSON.stringify(result.input)
    );

}



/* =========================================================
   GET LATEST RESULT
========================================================= */

function getLatestResult() {

    const raw =
        localStorage.getItem(
            "sirasenta_result"
        );


    if (!raw) {

        return null;

    }


    try {

        return JSON.parse(raw);

    }

    catch (error) {

        console.error(
            "Data SIRASENTA rusak:",
            error
        );

        return null;

    }

}



/* =========================================================
   ANALYSIS PAGE
========================================================= */

function initializeAnalysis() {

    const form =
        document.getElementById(
            "analysisForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                getAnalysisInput();


            if (!input) {

                return;

            }


            /* =====================================
               VALIDATE WEIGHTS
            ===================================== */

            const total =

                Number(input.weightEconomic || 0)

                +

                Number(input.weightEnvironment || 0)

                +

                Number(input.weightTechnical || 0)

                +

                Number(input.weightCircularity || 0)

                +

                Number(input.weightSocial || 0);


            if (total !== 100) {

                alert(
                    `Total bobot harus 100%. Saat ini ${total}%.`
                );

                return;

            }


            /* =====================================
               GENERATE
            ===================================== */

            const result =
                generateResult(input);


            /* =====================================
               SAVE
            ===================================== */

            saveResult(result);


            /* =====================================
               REDIRECT
            ===================================== */

            window.location.href =
                "result.html";

        }
    );

}



/* =========================================================
   AUTO INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAnalysis();

    }
);
