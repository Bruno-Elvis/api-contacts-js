const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
    async index(request, response) {
        const { orden } = request.query;

        const categories = await CategoryRepository.findAll(orden);

        response.json(categories);

    };

    async show(request, response) {
        const { id } = request.params;

        const category = await CategoryRepository.findById(id);

        if (!category) {
            return response.status(404).json({ error: 'Category not found' });

        };

        response.json(category);

    };

    async store(request, response) {
        const { name } = request.body;

        const categoryExists = await CategoryRepository.findByName(name);

        if (!name) {
            return response.status(400).json({ error: 'Name is required' });

        } else if (categoryExists) {
            return response.status(400).json({ error: 'This name is already in use' });

        };

        const category = await CategoryRepository.create(name);

        response.status(204).json(category);

    };

    async update(request, response) {
        const { id } = request.params;

        const { name } = request.body;

        if (!name) return response.status(400).json({ error: 'Name is required' });

        const categoryIdExists = await CategoryRepository.findById(id);

        const categoryNameExists = await CategoryRepository.findByName(name);

        if (!categoryIdExists) {
            return response.status(404).json({ error: 'Category not found' });

        } else if (categoryNameExists && categoryNameExists.id !== id) {
            return response.status(404).json({ error: 'This name is already in use' });

        };

        const category = await CategoryRepository.update(id, name);

        return response.json(category);

    };

    async delete(request, response) {
        const { id } = request.params;

        await CategoryRepository.delete(id);

        response.sendStatus(204);

    };

};

module.exports = new CategoryController();
