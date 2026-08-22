document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("analysisForm");

    if (!form) return;


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =========================================
           1. AMBIL DATA FORM
        ========================================= */

        const formData = new FormData(form);

        const input = Object.fromEntries(
            formData.entries()
        );


        /* =========================================
           2. CEK BOBOT
        ========================================= */

        const totalWeight =
            Number(input.weightEconomic || 0) +
            Number(input.weightEnvironment || 0) +
            Number(input.weightTechnical || 0) +
            Number(input.weightCircularity || 0) +
            Number(input.weightSocial || 0);


        if (totalWeight !== 100) {

            alert(
                `Total bobot harus 100%. Saat ini ${totalWeight}%.`
            );

            return;
        }


        /* =========================================
           3. DATABASE ALTERNATIF
        ========================================= */

        const alternatives = [

            {
                id: "pakan-fermentasi",

                name:
                    "Pakan Ternak Fermentasi",

                category:
                    "Biokonversi",

                icon:
                    "🐄",

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

                    "Pemilahan residu",

                    "Pengurangan kadar air",

                    "Pencacahan",

                    "Fermentasi",

                    "Pengeringan",

                    "Validasi keamanan",

                    "Pemanfaatan sebagai pakan"

                ],

                risks: [

                    "Kualitas nutrisi harus divalidasi.",

                    "Penyimpanan harus dikontrol.",

                    "Pengujian keamanan diperlukan."

                ],

                references: [

                    {
                        title:
                            "Soybean curd residue as a potential feed resource",

                        journal:
                            "Waste Management & Research",

                        year:
                            2020
                    }

                ]

            },


            {
                id: "kompos",

                name:
                    "Kompos Organik",

                category:
                    "Daur Ulang Organik",

                icon:
                    "🌱",

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
                    "Pengolahan limbah organik menjadi kompos.",

                process: [

                    "Pemilahan",

                    "Pencacahan",

                    "Pencampuran",

                    "Dekomposisi",

                    "Pematangan"

                ],

                risks: [

                    "Membutuhkan ruang.",

                    "Kadar air perlu dikontrol."

                ],

                references: [

                    {
                        title:
                            "Composting of organic waste and resource recovery",

                        journal:
                            "Bioresource Technology",

                        year:
                            2020
                    }

                ]

            },


            {
                id: "biogas",

                name:
                    "Produksi Biogas",

                category:
                    "Energi Terbarukan",

                icon:
                    "⚡",

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
                    "Konversi limbah organik melalui anaerobic digestion untuk menghasilkan biogas.",

                process: [

                    "Pengumpulan",

                    "Pra-pengolahan",

                    "Pengisian digester",

                    "Anaerobic digestion",

                    "Pengumpulan biogas",

                    "Pemanfaatan energi"

                ],

                risks: [

                    "Investasi awal tinggi.",

                    "Membutuhkan instalasi digester."

                ],

                references: [

                    {
                        title:
                            "Anaerobic digestion of agro-industrial waste",

                        journal:
                            "Renewable Energy",

                        year:
                            2021
                    }

                ]

            },


            {
                id: "briket",

                name:
                    "Briket Biomassa",

                category:
                    "Energi Biomassa",

                icon:
                    "🔥",

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
                    "Konversi biomassa kering menjadi bahan bakar padat alternatif.",

                process: [

                    "Pemilahan biomassa",

                    "Pengeringan",

                    "Penghalusan",

                    "Pencampuran",

                    "Pencetakan",

                    "Pengeringan akhir"

                ],

                risks: [

                    "Kadar air harus dikontrol.",

                    "Membutuhkan mesin pencetak."

                ],

                references: [

                    {
                        title:
                            "Biomass waste conversion into solid fuel",

                        journal:
                            "Renewable and Sustainable Energy Reviews",

                        year:
                            2020
                    }

                ]

            },


            {
                id: "pupuk-cair",

                name:
                    "Pupuk Organik Cair",

                category:
                    "Bioproses",

                icon:
                    "💧",

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
                    "Pengolahan bahan organik menjadi pupuk organik cair melalui fermentasi.",

                process: [

                    "Pemisahan",

                    "Pencacahan",

                    "Pencampuran",

                    "Fermentasi",

                    "Penyaringan",

                    "Pengujian kualitas"

                ],

                risks: [

                    "Kualitas dipengaruhi proses fermentasi.",

                    "Pengendalian bau diperlukan."

                ],

                references: [

                    {
                        title:
                            "Organic waste valorization through liquid fertilizer production",

                        journal:
                            "Journal of Environmental Management",

                        year:
                            2021
                    }

                ]

            }

        ];



        /* =========================================
           4. BOBOT MCDA
        ========================================= */

        const weights = {

            economic:
                Number(input.weightEconomic) / 100,

            environment:
                Number(input.weightEnvironment) / 100,

            technical:
                Number(input.weightTechnical) / 100,

            circularity:
                Number(input.weightCircularity) / 100,

            social:
                Number(input.weightSocial) / 100

        };



        /* =========================================
           5. PENYESUAIAN KONDISI USAHA
        ========================================= */

        function calculateScore(
            alternative
        ) {

            let scores = {
                ...alternative.scores
            };


            /*
            Budget
            */

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


            /*
            Teknologi
            */

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


            /*
            Lahan
            */

            if (
                input.landAvailability === "rendah" &&
                alternative.requirements.land === "sedang"
            ) {

                scores.technical -= 8;

            }


            /*
            Kandungan organik
            */

            if (
                input.organicContent === "tinggi"
            ) {

                if (
                    alternative.id ===
                    "pakan-fermentasi"
                ) {

                    scores.circularity += 3;

                }

                if (
                    alternative.id ===
                    "biogas"
                ) {

                    scores.environment += 3;

                }

            }


            /*
            Kadar air tinggi
            */

            if (
                input.moisture === "tinggi"
            ) {

                if (
                    alternative.id ===
                    "briket"
                ) {

                    scores.technical -= 10;

                }

                if (
                    alternative.id ===
                    "biogas"
                ) {

                    scores.technical += 4;

                }

            }


            /*
            Air limbah
            */

            if (
                input.wasteType ===
                "air-limbah-tahu"
            ) {

                if (
                    alternative.id ===
                    "biogas"
                ) {

                    scores.environment += 5;

                }

                if (
                    alternative.id ===
                    "briket"
                ) {

                    scores.technical -= 15;

                }

            }


            /*
            Ampas tahu
            */

            if (
                input.wasteType ===
                "ampas-tahu"
            ) {

                if (
                    alternative.id ===
                    "pakan-fermentasi"
                ) {

                    scores.circularity += 5;

                    scores.economic += 3;

                }

            }


            /*
            Kondisi terkontaminasi
            */

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


            /*
            Batasi 0–100
            */

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


            /*
            Weighted Sum Model
            */

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



        /* =========================================
           6. HITUNG SEMUA ALTERNATIF
        ========================================= */

        let ranking =
            alternatives.map(
                calculateScore
            );


        ranking.sort(
            (a, b) =>
                b.finalScore -
                a.finalScore
        );


        ranking =
            ranking.map(
                (item, index) => ({

                    ...item,

                    rank:
                        index + 1

                })
            );



        /* =========================================
           7. REKOMENDASI
        ========================================= */

        const winner =
            ranking[0];


        const runnerUp =
            ranking[1];


        const difference =
            winner.finalScore -
            runnerUp.finalScore;


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



        let recommendationLevel;


        if (
            winner.finalScore >= 85
        ) {

            recommendationLevel =
                "Sangat Direkomendasikan";

        }

        else if (
            winner.finalScore >= 75
        ) {

            recommendationLevel =
                "Direkomendasikan";

        }

        else if (
            winner.finalScore >= 65
        ) {

            recommendationLevel =
                "Cukup Direkomendasikan";

        }

        else {

            recommendationLevel =
                "Perlu Kajian Lebih Lanjut";

        }



        /* =========================================
           8. HASIL FINAL
        ========================================= */

        const result = {

            timestamp:
                new Date().toISOString(),

            input:
                input,

            weights:
                weights,

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
                    recommendationLevel,

                explanation:

                    `${winner.name} memperoleh skor tertinggi sebesar ${winner.finalScore}/100 berdasarkan pembobotan MCDA terhadap aspek ekonomi, lingkungan, teknis, sirkularitas, dan sosial.`

            },

            ranking:
                ranking

        };



        /* =========================================
           9. SIMPAN
        ========================================= */

        localStorage.setItem(

            "sirasenta_result",

            JSON.stringify(
                result
            )

        );


        /*
        Simpan juga dengan key lama
        supaya kompatibel dengan
        halaman lama.
        */

        localStorage.setItem(

            "sirasentaAnalysis",

            JSON.stringify(
                input
            )

        );



        /* =========================================
           10. PINDAH KE RESULT
        ========================================= */

        window.location.href =
            "result.html";

    });

});
