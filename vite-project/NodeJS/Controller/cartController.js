import Cart from '../Model/cartModels.js' // Import cart model
import Product from '../Model/productsModel.js'; // Import product model

// Add a product to the cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Ensure that productId and quantity are provided
  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    // Validate if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user already has this product in their cart
    let cartItem = await Cart.findOne({ productId, userId: req.user.id });

    if (cartItem) {
      // If product already in cart, update the quantity
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stockQuantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }
      await cartItem.save();
      return res.status(200).json({ message: 'Product quantity updated in cart', cartItem });
    }

    // If product not in cart, create a new cart item
    const newCartItem = new Cart({
      userId: req.user.id,
      productId,
      quantity,
    });

    // Ensure the quantity doesn't exceed stock
    if (newCartItem.quantity > product.stockQuantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Save the new cart item to the database
    await newCartItem.save();
    res.status(201).json({ message: 'Product added to cart', newCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// Get all cart items for the logged-in user
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate('productId');
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
};

// Update the quantity of a product in the cart
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const { cartItemId } = req.params;

  // Ensure the quantity is provided
  if (!quantity) {
    return res.status(400).json({ message: 'Quantity is required' });
  }

  try {
    // Find the cart item
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Validate product stock availability
    const product = await Product.findById(cartItem.productId);
    if (quantity > product.stockQuantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart item quantity updated', cartItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
};

// Remove a product from the cart
export const removeCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const cartItem = await Cart.findByIdAndDelete(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
};
