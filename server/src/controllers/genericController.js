const createOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getOne = (Model, populateOptions) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getOneBySlug = (Model, populateOptions) => async (req, res) => {
  try {
    let query = Model.findOne({ slug: req.params.slug });
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Resource not found by slug' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAll = (Model, defaultFilter = {}) => async (req, res) => {
  try {
    const filter = { ...defaultFilter, ...req.query };
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete filter[el]);

    let query = Model.find(filter);

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const doc = await query;
    res.status(200).json({ success: true, count: doc.length, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createOne,
  getOne,
  getOneBySlug,
  getAll,
  updateOne,
  deleteOne,
};
