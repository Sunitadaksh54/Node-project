import Product from "../Model/productsModel.js";
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;

    // Validate product data
    if (!name || !price || !description || !stock) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new product instance
    const newProduct = new Product({
      name:name,
      price:price,
      description:description,
      stock:stock
     
    });

    // Save the product in the database
    await newProduct.save();

    // Respond with the newly created product
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch products from the database
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Fetch a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};
