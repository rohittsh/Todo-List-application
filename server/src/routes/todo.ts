import { Router } from 'express';
import Todo from '../models/Todo';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(requireAuth);

// create
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const todo = await Todo.create({ user: req.userId, title, description });
    res.json(todo);
  } catch (err) { next(err); }
});

// list
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) { next(err); }
});

// update
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({ _id: id, user: req.userId }, req.body, { new: true });
    if(!todo) return res.status(404).json({ message: 'Not found' });
    res.json(todo);
  } catch (err) { next(err); }
});

// delete
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if(!todo) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
});

export default router;
