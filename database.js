/* =========================================================
   SIRASENTA
   DATABASE / KNOWLEDGE BASE

   Sistem Integrasi dan Analisis Terpadu Efisiensi
   serta Alternatif Pengolahan Limbah

   File ini berisi:
   1. Kriteria MCDA
   2. Alternatif pengolahan
   3. Skor dasar alternatif
   4. Faktor penyesuaian
   5. Referensi penelitian
========================================================= */


/* =========================================================
   1. INFORMASI SISTEM
========================================================= */

const SIRASENTA_DATABASE = {

    system: {

        name: "SIRASENTA",

        fullName:
            "Sistem Integrasi dan Analisis Terpadu Efisiensi serta Alternatif Pengolahan Limbah",

        version: "1.0.0",

        method:
            "Multi-Criteria Decision Analysis (MCDA)",

        purpose:
            "Membantu UMKM menentukan alternatif pengolahan limbah yang paling sesuai berdasarkan karakteristik limbah, kondisi usaha, dan prioritas keputusan."

    },


    /* =====================================================
       2. KRITERIA MCDA
    ===================================================== */

    criteria: [

        {
            id: "economic",

            name: "Efisiensi Ekonomi",

            shortName: "Ekonomi",

            type: "benefit",

            description:
                "Kemampuan alternatif menghasilkan manfaat ekonomi dengan biaya implementasi yang sesuai.",

            defaultWeight: 25
        },


        {
            id: "environment",

            name: "Dampak Lingkungan",

            shortName: "Lingkungan",

            type: "benefit",

            description:
                "Potensi alternatif dalam mengurangi beban limbah dan memberikan manfaat lingkungan.",

            defaultWeight: 25
        },


        {
            id: "technical",

            name: "Kelayakan Teknis",

            shortName: "Teknis",

            type: "benefit",

            description:
                "Tingkat kemudahan penerapan teknologi berdasarkan kebutuhan alat, proses, dan keterampilan.",

            defaultWeight: 20
        },


        {
            id: "circularity",

            name: "Potensi Sirkularitas",

            shortName: "Sirkularitas",

            type: "benefit",

            description:
                "Kemampuan alternatif mengubah residu menjadi sumber daya atau produk bernilai.",

            defaultWeight: 20
        },


        {
            id: "social",

            name: "Dampak Sosial",

            shortName: "Sosial",

            type: "benefit",

            description:
                "Potensi alternatif dalam memberikan manfaat bagi pekerja, masyarakat, dan ekosistem usaha.",

            defaultWeight: 10
        }

    ],



    /* =====================================================
       3. ALTERNATIF PENGOLAHAN LIMBAH
    ===================================================== */

    alternatives: [

        /* =================================================
           A1 — PAKAN TERNAK
        ================================================= */

        {

            id: "feed",

            code: "A1",

            name: "Pakan Ternak",

            category: "Valorisasi Biomassa",

            icon: "🐄",

            description:
                "Pemanfaatan residu organik yang memenuhi persyaratan keamanan dan nutrisi sebagai bahan pakan.",

            suitableWaste: [

                "ampas-tahu",

                "kulit-kedelai"

            ],

            baseScore: {

                economic: 88,

                environment: 91,

                technical: 72,

                circularity: 96,

                social: 88

            },

            requirements: [

                "Karakterisasi nutrisi",

                "Pengujian keamanan bahan",

                "Kontrol kadar air",

                "Pengendalian kontaminasi",

                "Formulasi pakan sesuai kebutuhan ternak"

            ],

            risks: [

                "Kontaminasi mikroba",

                "Kandungan antinutrisi",

                "Ketidakseimbangan nutrisi",

                "Risiko mikotoksin jika penyimpanan buruk"

            ],

            process: [

                "Seleksi bahan",

                "Sortasi",

                "Pengeringan",

                "Pengolahan atau fermentasi",

                "Pengujian kualitas",

                "Formulasi",

                "Pemberian pada ternak"

            ],

            evidence: [

                {
                    title:
                        "Soybean curd residue as a potential feed resource",

                    journal:
                        "Animal Feed Science and Technology",

                    year: 2020,

                    relevance:
                        "Mendukung potensi residu kedelai sebagai sumber bahan pakan setelah pengolahan dan evaluasi kualitas."

                },

                {
                    title:
                        "Valorization of food processing by-products for animal feed",

                    journal:
                        "Journal of Cleaner Production",

                    year: 2021,

                    relevance:
                        "Membahas pendekatan valorisasi hasil samping industri pangan untuk mengurangi limbah dan menghasilkan nilai tambah."

                }

            ]

        },


        /* =================================================
           A2 — KOMPOS
        ================================================= */

        {

            id: "compost",

            code: "A2",

            name: "Kompos Organik",

            category: "Biokonversi",

            icon: "🌱",

            description:
                "Pengolahan limbah organik melalui proses dekomposisi terkontrol menjadi bahan pembenah tanah.",

            suitableWaste: [

                "ampas-tahu",

                "kulit-kedelai",

                "campuran"

            ],

            baseScore: {

                economic: 76,

                environment: 94,

                technical: 86,

                circularity: 90,

                social: 84

            },

            requirements: [

                "Area pengomposan",

                "Pengaturan kelembapan",

                "Aerasi",

                "Pengaturan rasio bahan",

                "Monitoring proses dekomposisi"

            ],

            risks: [

                "Bau",

                "Kelembapan terlalu tinggi",

                "Proses tidak optimal",

                "Kontaminasi bahan"

            ],

            process: [

                "Sortasi",

                "Pencampuran bahan",

                "Pengaturan kelembapan",

                "Aerasi",

                "Dekomposisi",

                "Pematangan",

                "Pemanfaatan kompos"

            ],

            evidence: [

                {
                    title:
                        "Composting of agro-industrial residues",

                    journal:
                        "Waste Management",

                    year: 2020,

                    relevance:
                        "Menjelaskan pengomposan residu agroindustri sebagai strategi pengurangan limbah organik."

                },

                {
                    title:
                        "Organic waste composting and soil amendment",

                    journal:
                        "Bioresource Technology",

                    year: 2021,

                    relevance:
                        "Mendukung pemanfaatan limbah organik yang dikomposkan sebagai pembenah tanah."

                }

            ]

        },


        /* =================================================
           A3 — BIOGAS
        ================================================= */

        {

            id: "biogas",

            code: "A3",

            name: "Biogas",

            category: "Energi Terbarukan",

            icon: "⚡",

            description:
                "Pemanfaatan bahan organik melalui proses anaerobic digestion untuk menghasilkan biogas dan digestate.",

            suitableWaste: [

                "ampas-tahu",

                "air-limbah-tahu",

                "campuran"

            ],

            baseScore: {

                economic: 79,

                environment: 96,

                technical: 63,

                circularity: 93,

                social: 80

            },

            requirements: [

                "Digester",

                "Kontrol proses anaerob",

                "Pengelolaan substrat",

                "Sistem penampungan gas",

                "Monitoring proses"

            ],

            risks: [

                "Kebocoran gas",

                "Ketidakstabilan proses",

                "Investasi awal",

                "Pengelolaan digestate"

            ],

            process: [

                "Persiapan substrat",

                "Pemasukan ke digester",

                "Anaerobic digestion",

                "Produksi biogas",

                "Pemurnian atau pemanfaatan gas",

                "Pengelolaan digestate"

            ],

            evidence: [

                {
                    title:
                        "Anaerobic digestion of agro-industrial waste",

                    journal:
                        "Renewable and Sustainable Energy Reviews",

                    year: 2020,

                    relevance:
                        "Membahas anaerobic digestion sebagai teknologi pemulihan energi dari limbah organik."

                },

                {
                    title:
                        "Biogas production from food processing waste",

                    journal:
                        "Bioresource Technology",

                    year: 2021,

                    relevance:
                        "Mendukung potensi limbah industri pangan sebagai substrat produksi biogas."

                }

            ]

        },


        /* =================================================
           A4 — PUPUK ORGANIK CAIR
        ================================================= */

        {

            id: "liquid-fertilizer",

            code: "A4",

            name: "Pupuk Organik Cair",

            category: "Pemulihan Nutrien",

            icon: "💧",

            description:
                "Pemanfaatan fraksi cair atau hasil pengolahan organik menjadi pupuk organik cair melalui proses terkontrol.",

            suitableWaste: [

                "air-limbah-tahu",

                "campuran"

            ],

            baseScore: {

                economic: 82,

                environment: 89,

                technical: 78,

                circularity: 91,

                social: 82

            },

            requirements: [

                "Pengolahan awal",

                "Fermentasi",

                "Kontrol pH",

                "Pengujian kandungan",

                "Pengelolaan penyimpanan"

            ],

            risks: [

                "Kandungan bahan belum stabil",

                "Bau",

                "Kontaminasi",

                "Kualitas tidak konsisten"

            ],

            process: [

                "Penyaringan",

                "Pengaturan bahan",

                "Fermentasi",

                "Monitoring pH",

                "Pematangan",

                "Pengujian",

                "Aplikasi"

            ],

            evidence: [

                {
                    title:
                        "Recovery of nutrients from food processing wastewater",

                    journal:
                        "Journal of Environmental Management",

                    year: 2021,

                    relevance:
                        "Membahas pemulihan nutrien dari air limbah industri pangan."

                },

                {
                    title:
                        "Organic liquid fertilizer from agro-industrial residues",

                    journal:
                        "Environmental Technology & Innovation",

                    year: 2022,

                    relevance:
                        "Mendukung pemanfaatan residu agroindustri untuk menghasilkan produk bernilai."

                }

            ]

        },


        /* =================================================
           A5 — FERMENTASI / BIOMASS
        ================================================= */

        {

            id: "fermented-biomass",

            code: "A5",

            name: "Fermentasi Biomassa",

            category: "Biokonversi",

            icon: "♻️",

            description:
                "Pengolahan residu organik melalui fermentasi untuk meningkatkan stabilitas, kualitas, dan potensi pemanfaatannya.",

            suitableWaste: [

                "ampas-tahu",

                "kulit-kedelai",

                "campuran"

            ],

            baseScore: {

                economic: 84,

                environment: 90,

                technical: 81,

                circularity: 94,

                social: 83

            },

            requirements: [

                "Starter atau inokulum",

                "Kontrol kadar air",

                "Kontrol suhu",

                "Waktu fermentasi",

                "Penyimpanan"

            ],

            risks: [

                "Fermentasi gagal",

                "Kontaminasi",

                "Kualitas tidak seragam",

                "Kelembapan tinggi"

            ],

            process: [

                "Sortasi",

                "Persiapan bahan",

                "Inokulasi",

                "Fermentasi",

                "Pengeringan",

                "Pengujian",

                "Pemanfaatan"

            ],

            evidence: [

                {
                    title:
                        "Fermentation of agro-industrial residues for value-added products",

                    journal:
                        "Bioresource Technology Reports",

                    year: 2022,

                    relevance:
                        "Membahas fermentasi residu agroindustri untuk meningkatkan nilai guna biomassa."

                }

            ]

        }

    ],



    /* =====================================================
       4. FAKTOR KONDISI LIMBAH
    ===================================================== */

    wasteFactors: {

        moisture: {

            rendah: {

                feed: 1.05,

                compost: 0.95,

                biogas: 0.90,

                "liquid-fertilizer": 0.85,

                "fermented-biomass": 1.00

            },

            sedang: {

                feed: 1.00,

                compost: 1.00,

                biogas: 1.00,

                "liquid-fertilizer": 1.00,

                "fermented-biomass": 1.00

            },

            tinggi: {

                feed: 0.82,

                compost: 1.05,

                biogas: 1.10,

                "liquid-fertilizer": 1.12,

                "fermented-biomass": 0.95

            }

        },


        organicContent: {

            rendah: {

                feed: 0.85,

                compost: 0.90,

                biogas: 0.82,

                "liquid-fertilizer": 0.90,

                "fermented-biomass": 0.85

            },

            sedang: {

                feed: 1.00,

                compost: 1.00,

                biogas: 1.00,

                "liquid-fertilizer": 1.00,

                "fermented-biomass": 1.00

            },

            tinggi: {

                feed: 1.05,

                compost: 1.08,

                biogas: 1.12,

                "liquid-fertilizer": 1.05,

                "fermented-biomass": 1.08

            }

        }

    },



    /* =====================================================
       5. FAKTOR SKALA USAHA
    ===================================================== */

    scaleFactors: {

        kecil: {

            feed: 1.05,

            compost: 1.00,

            biogas: 0.80,

            "liquid-fertilizer": 1.00,

            "fermented-biomass": 1.05

        },

        menengah: {

            feed: 1.00,

            compost: 1.00,

            biogas: 1.00,

            "liquid-fertilizer": 1.00,

            "fermented-biomass": 1.00

        },

        besar: {

            feed: 1.00,

            compost: 1.05,

            biogas: 1.12,

            "liquid-fertilizer": 1.05,

            "fermented-biomass": 1.00

        }

    },



    /* =====================================================
       6. FAKTOR KESIAPAN TEKNOLOGI
    ===================================================== */

    technologyFactors: {

        rendah: {

            feed: 0.95,

            compost: 1.05,

            biogas: 0.72,

            "liquid-fertilizer": 0.92,

            "fermented-biomass": 0.95

        },

        sedang: {

            feed: 1.00,

            compost: 1.00,

            biogas: 1.00,

            "liquid-fertilizer": 1.00,

            "fermented-biomass": 1.00

        },

        tinggi: {

            feed: 1.05,

            compost: 0.98,

            biogas: 1.10,

            "liquid-fertilizer": 1.05,

            "fermented-biomass": 1.05

        }

    },



    /* =====================================================
       7. FAKTOR INVESTASI
    ===================================================== */

    budgetFactors: {

        rendah: {

            feed: 0.95,

            compost: 1.05,

            biogas: 0.65,

            "liquid-fertilizer": 0.90,

            "fermented-biomass": 0.95

        },

        sedang: {

            feed: 1.00,

            compost: 1.00,

            biogas: 0.95,

            "liquid-fertilizer": 1.00,

            "fermented-biomass": 1.00

        },

        tinggi: {

            feed: 1.05,

            compost: 1.00,

            biogas: 1.10,

            "liquid-fertilizer": 1.05,

            "fermented-biomass": 1.05

        }

    }

};



/* =========================================================
   8. HELPER FUNCTIONS
========================================================= */


/*
    Mengambil semua alternatif.
*/

function getAlternatives() {

    return SIRASENTA_DATABASE.alternatives;

}



/*
    Mengambil alternatif berdasarkan ID.
*/

function getAlternativeById(id) {

    return SIRASENTA_DATABASE.alternatives.find(
        alternative =>
            alternative.id === id
    );

}



/*
    Mengambil alternatif berdasarkan jenis limbah.
*/

function getAlternativesByWaste(wasteType) {

    return SIRASENTA_DATABASE.alternatives.filter(
        alternative =>
            alternative.suitableWaste.includes(wasteType)
    );

}



/*
    Mengambil kriteria.
*/

function getCriteria() {

    return SIRASENTA_DATABASE.criteria;

}



/*
    Mengambil referensi alternatif.
*/

function getEvidence(alternativeId) {

    const alternative =
        getAlternativeById(alternativeId);

    if (!alternative) {

        return [];

    }

    return alternative.evidence || [];

}



/*
    Mengubah level menjadi angka.

    Digunakan oleh mesin analisis.
*/

function levelToScore(level) {

    const scores = {

        rendah: 40,

        sedang: 70,

        tinggi: 95

    };

    return scores[level] || 70;

}



/*
    Membatasi angka agar berada
    dalam rentang 0–100.
*/

function clampScore(value) {

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );

}



/*
    Mengambil faktor kondisi limbah.
*/

function getWasteFactor(
    factorName,
    level,
    alternativeId
) {

    const factor =
        SIRASENTA_DATABASE
            .wasteFactors[factorName];

    if (!factor) {

        return 1;

    }

    if (!factor[level]) {

        return 1;

    }

    return factor[level][alternativeId] || 1;

}



/*
    Mengambil faktor skala.
*/

function getScaleFactor(
    scale,
    alternativeId
) {

    return (
        SIRASENTA_DATABASE
            .scaleFactors[scale]?.[alternativeId]
        || 1
    );

}



/*
    Mengambil faktor teknologi.
*/

function getTechnologyFactor(
    technology,
    alternativeId
) {

    return (
        SIRASENTA_DATABASE
            .technologyFactors[technology]?.[alternativeId]
        || 1
    );

}



/*
    Mengambil faktor investasi.
*/

function getBudgetFactor(
    budget,
    alternativeId
) {

    return (
        SIRASENTA_DATABASE
            .budgetFactors[budget]?.[alternativeId]
        || 1
    );

}



/* =========================================================
   9. EXPORT GLOBAL
========================================================= */

/*
   Karena aplikasi kita menggunakan HTML biasa
   tanpa bundler/framework, database dibuat global
   agar dapat dipanggil oleh script.js.
*/

window.SIRASENTA_DATABASE =
    SIRASENTA_DATABASE;


window.getAlternatives =
    getAlternatives;


window.getAlternativeById =
    getAlternativeById;


window.getAlternativesByWaste =
    getAlternativesByWaste;


window.getCriteria =
    getCriteria;


window.getEvidence =
    getEvidence;


window.levelToScore =
    levelToScore;


window.clampScore =
    clampScore;


window.getWasteFactor =
    getWasteFactor;


window.getScaleFactor =
    getScaleFactor;


window.getTechnologyFactor =
    getTechnologyFactor;


window.getBudgetFactor =
    getBudgetFactor;
