const express = require('express');
const router = express.Router();
const { SiteSettings, SEOSettings } = require('../models');
const { protectAdmin } = require('../middleware/auth');

router.get('/site', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/site', protectAdmin, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/seo', async (req, res) => {
  try {
    let seo = await SEOSettings.findOne();
    if (!seo) {
      seo = await SEOSettings.create({});
    }
    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/seo', protectAdmin, async (req, res) => {
  try {
    let seo = await SEOSettings.findOne();
    if (!seo) {
      seo = await SEOSettings.create(req.body);
    } else {
      seo = await SEOSettings.findByIdAndUpdate(seo._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json({ success: true, data: seo });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
