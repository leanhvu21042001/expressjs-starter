import { Router } from 'express';
// import { index } from '@/controllers/health.controller';

const router = Router();

// GET /api/test
router.route('/').get((req, res) => res.json({ message: 'test' }));

router.route('/:id').get((req, res) => res.json({ message: req.params.id }));

export default router;
