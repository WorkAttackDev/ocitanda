const router = require('express').Router();
const provincesRoutes = require('./provinces/routes');
const usersRoutes = require('./users/routes');
const categoriesRoutes = require('./categories/routes');
const addressesRoutes = require('./addresses/routes');
const producersRoutes = require('./producers/routes');
const consumersRoutes = require('./consumers/routes');
const productsRoutes = require('./products/routes');
const purchasesRoutes = require('./purchases/routes');
const cartsRoutes = require('./carts/routes');
const authRoutes = require('./auth/routes');
const forgotPasswordRoutes = require('./forgot-password/routes');
const subscribersRoutes = require('./subscribers/routes');

router.get('/', (req, res) => {
	res.json({ message: 'API endpoint' });
});

router.use('/provinces', provincesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);
router.use('/addresses', addressesRoutes);
router.use('/consumers', consumersRoutes);
router.use('/producers', producersRoutes);
router.use('/products', productsRoutes);
router.use('/purchases', purchasesRoutes);
router.use('/carts', cartsRoutes);
router.use('/auth', authRoutes);
router.use('/subscribers', subscribersRoutes);
router.use('/forgot-password', forgotPasswordRoutes);

module.exports = router;
