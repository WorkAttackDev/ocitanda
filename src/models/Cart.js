export default (
	id,
	count,
	consumerId,
	productId,
	quantity,
	producerId,
	price,
	unity,
	name,
	imageUrl,
	description,
	categoryId
) => ({
	cartId: id,
	count,
	consumerId,
	id: productId,
	quantity,
	producerId,
	price,
	originalPrice: price,
	name,
	unity,
	img: imageUrl,
	desc: description,
	categoryId,
});
