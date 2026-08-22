/*
=========================================================
SIRASENTA DATABASE
Sistem Integrasi dan Analisis Terpadu Efisiensi
serta Alternatif Pengolahan Limbah
=========================================================
*/

const SIRASENTA_DATABASE = {

    alternatives: [

        {
            id: "pakan-fermentasi",

            name: "Pakan Ternak Fermentasi",

            category: "Biokonversi",

            icon: "🐄",

            description:
                "Pemanfaatan residu organik sebagai bahan pakan melalui proses pengolahan dan fermentasi terkontrol.",

            scores: {
                economic: 86,
                environment: 91,
                technical: 78,
                circularity: 96,
                social: 88
            },

            requirements: {
                land: "rendah",
                technology: "sedang",
                budget: "sedang"
            },

            process: [

                "Pemilahan dan pengumpulan residu",

                "Pengurangan kadar air",

                "Penggilingan atau pencacahan",

                "Fermentasi menggunakan starter yang sesuai",

                "Pengeringan dan penyimpanan",

                "Validasi keamanan dan kualitas",

                "Pemanfaatan sebagai bahan pakan"

            ],

            risks: [

                "Kandungan nutrisi perlu divalidasi sebelum digunakan sebagai pakan.",

                "Kondisi penyimpanan harus dikontrol untuk mencegah pertumbuhan jamur.",

                "Diperlukan pengujian keamanan terutama terhadap kontaminasi mikrobiologis dan mikotoksin."

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
                        "Residu industri tahu dapat memiliki nilai nutrisi dan berpotensi dimanfaatkan sebagai sumber bahan pakan setelah melalui pengolahan yang sesuai."
                },

                {
                    title:
                        "Fermentation of agro-industrial residues for animal feed",

                    journal:
                        "Animal Feed Science and Technology",

                    year:
                        2021,

                    relevance:
                        "Fermentasi dapat digunakan untuk meningkatkan karakteristik bahan dan membantu pengelolaan residu agroindustri."
                }

            ]

        },


        {
            id: "kompos",

            name: "Kompos Organik",

            category: "Daur Ulang Organik",

            icon: "🌱",

            description:
                "Pengolahan limbah organik menjadi kompos yang dapat dimanfaatkan sebagai pembenah tanah dan sumber bahan organik.",

            scores: {
                economic: 74,
                environment: 94,
                technical: 88,
                circularity: 91,
                social: 84
            },

            requirements: {
                land: "sedang",
                technology: "rendah",
                budget: "rendah"
            },

            process: [

                "Pemilahan limbah",

                "Pencacahan bahan",

                "Pencampuran bahan organik",

                "Pengaturan kadar air",

                "Proses dekomposisi",

                "Pembalikan berkala",

                "Pematangan dan pengemasan"

            ],

            risks: [

                "Membutuhkan ruang untuk proses pengomposan.",

                "Kadar air perlu dikontrol.",

                "Proses membutuhkan waktu relatif lebih lama dibanding beberapa alternatif lain."

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
                        "Pengomposan merupakan salah satu pendekatan pengelolaan limbah organik yang dapat mengembalikan unsur organik ke tanah."
                }

            ]

        },


        {
            id: "biogas",

            name: "Produksi Biogas",

            category: "Energi Terbarukan",

            icon: "⚡",

            description:
                "Pemanfaatan limbah organik melalui proses anaerobic digestion untuk menghasilkan biogas dan digestate.",

            scores: {
                economic: 82,
                environment: 95,
                technical: 69,
                circularity: 93,
                social: 79
            },

            requirements: {
                land: "sedang",
                technology: "tinggi",
                budget: "tinggi"
            },

            process: [

                "Pengumpulan limbah",

                "Pra-pengolahan bahan",

                "Pencampuran substrat",

                "Pengisian digester",

                "Anaerobic digestion",

                "Pengumpulan biogas",

                "Pemanfaatan biogas sebagai energi",

                "Pemanfaatan digestate"

            ],

            risks: [

                "Investasi awal relatif tinggi.",

                "Membutuhkan instalasi dan pemeliharaan digester.",

                "Komposisi substrat memengaruhi produksi biogas."

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
                        "Anaerobic digestion dapat mengonversi limbah organik menjadi biogas sekaligus menghasilkan residu yang dapat dimanfaatkan kembali."
                }

            ]

        },


        {
            id: "briket",

            name: "Briket Biomassa",

            category: "Energi Biomassa",

            icon: "🔥",

            description:
                "Konversi residu biomassa kering menjadi bahan bakar padat alternatif.",

            scores: {
                economic: 79,
                environment: 82,
                technical: 76,
                circularity: 85,
                social: 80
            },

            requirements: {
                land: "rendah",
                technology: "sedang",
                budget: "sedang"
            },

            process: [

                "Pemilahan biomassa",

                "Pengeringan",

                "Penghalusan",

                "Pencampuran bahan pengikat",

                "Pencetakan",

                "Pengeringan akhir",

                "Pengujian kualitas",

                "Distribusi"

            ],

            risks: [

                "Bahan baku harus memiliki kadar air yang sesuai.",

                "Kualitas briket bergantung pada komposisi bahan.",

                "Membutuhkan peralatan pencetakan."

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
                        "Biomassa residu dapat dikonversi menjadi bahan bakar padat sebagai bagian dari strategi pemanfaatan sumber daya."
                }

            ]

        },


        {
            id: "pupuk-cair",

            name: "Pupuk Organik Cair",

            category: "Bioproses",

            icon: "💧",

            description:
                "Pengolahan bahan organik menjadi pupuk cair melalui proses biologis terkontrol.",

            scores: {
                economic: 81,
                environment: 89,
                technical: 82,
                circularity: 90,
                social: 86
            },

            requirements: {
                land: "rendah",
                technology: "sedang",
                budget: "rendah"
            },

            process: [

                "Pemisahan bahan organik",

                "Pencacahan",

                "Pencampuran dengan air",

                "Penambahan starter",

                "Fermentasi",

                "Penyaringan",

                "Pengujian kualitas",

                "Pengemasan"

            ],

            risks: [

                "Kualitas produk bergantung pada proses fermentasi.",

                "Produk perlu diuji sebelum diaplikasikan pada tanaman.",

                "Pengendalian bau perlu diperhatikan."

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
                        "Limbah organik dapat divalorisasi menjadi produk yang memiliki nilai guna melalui proses biologis."
                }

            ]

        }

    ]

};



/*
=========================================================
HELPER
=========================================================
*/

function getAlternatives() {

    return SIRASENTA_DATABASE.alternatives;

}


function getAlternativeById(id) {

    return SIRASENTA_DATABASE.alternatives.find(
        alternative =>
            alternative.id === id
    );

}
