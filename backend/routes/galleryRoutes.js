import express from 'express'
import { createGalleryItem, deleteGalleryItem, getGallery } from '../controllers/galleryController.js'
import { protect } from '../middlewares/auth.js'
import { upload } from '../middlewares/upload.js'

const router = express.Router()

router.get('/', getGallery)
router.post('/', protect, upload.single('image'), createGalleryItem)
router.delete('/:id', protect, deleteGalleryItem)

export default router
