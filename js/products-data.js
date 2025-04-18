const medicineProducts = {
    painRelief: [
        {
            id: 'p1',
            name: 'Paracetamol 500mg',
            category: 'Pain Relief',
            price: 30,
            image: 'images/products/paracetamol.jpg',
            description: 'For fever and mild pain relief'
        },
        {
            id: 'p2',
            name: 'Ibuprofen 400mg',
            category: 'Pain Relief',
            price: 45,
            description: 'Anti-inflammatory pain reliever'
        }
    ],
    firstAid: [
        {
            id: 'f1',
            name: 'Bandage Roll',
            category: 'First Aid',
            price: 25,
            description: 'Elastic bandage for wounds'
        },
        {
            id: 'f2',
            name: 'Antiseptic Solution',
            category: 'First Aid',
            price: 85,
            description: 'For cleaning wounds and cuts'
        }
    ],
    commonMedicines: [
        {
            id: 'c1',
            name: 'Cetirizine 10mg',
            category: 'Allergy',
            price: 35,
            description: 'Antihistamine for allergies'
        },
        {
            id: 'c2',
            name: 'Omeprazole 20mg',
            category: 'Digestive',
            price: 65,
            description: 'For acid reflux and heartburn'
        }
    ],
    vitamins: [
        {
            id: 'v1',
            name: 'Vitamin C 500mg',
            category: 'Vitamins',
            price: 120,
            description: 'Immunity booster'
        },
        {
            id: 'v2',
            name: 'Multivitamin Tablets',
            category: 'Vitamins',
            price: 180,
            description: 'Daily essential vitamins'
        }
    ],
    personalCare: [
        {
            id: 'pc1',
            name: 'Hand Sanitizer',
            category: 'Personal Care',
            price: 75,
            description: 'Alcohol-based sanitizer'
        },
        {
            id: 'pc2',
            name: 'Face Masks (10 pcs)',
            category: 'Personal Care',
            price: 100,
            description: 'Disposable face masks'
        }
    ]
};

// Function to get all products as a flat array
function getAllProducts() {
    return Object.values(medicineProducts).flat();
}

// Function to get products by category
function getProductsByCategory(category) {
    return medicineProducts[category] || [];
}