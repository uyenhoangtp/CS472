import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function extractNumbers(req) {
    const a = parseFloat(req.params.a ?? req.query.a ?? req.body.a);
    const b = parseFloat(req.params.b ?? req.query.b ?? req.body.b);
    return { a, b };
}

function createHandler(operation) {
    return (req, res) => {
        const { a, b } = extractNumbers(req);

        if (isNaN(a) || isNaN(b)) {
            return res.status(400).json({ error: 'Missing or invalid input numbers a and b' });
        }

        let result;
        switch (operation) {
            case 'add': result = a + b; break;
            case 'sub': result = a - b; break;
            case 'mul': result = a * b; break;
            case 'div': result = b !== 0 ? a / b : 'Infinity'; break;
            case 'mod': result = b !== 0 ? a % b : 'NaN'; break;
            default: return res.status(400).json({ error: 'Invalid operation' });
        }

        res.json({ results: result });
    };
}

const operations = [
    { name: 'addition', op: 'add' },
    { name: 'subtraction', op: 'sub' },
    { name: 'multiplication', op: 'mul' },
    { name: 'division', op: 'div' },
    { name: 'modulus', op: 'mod' }
];

operations.forEach(({ name, op }) => {
    app.get(`/${name}/:a/:b`, createHandler(op));
    app.get(`/${name}`, createHandler(op));
    app.post(`/${name}`, createHandler(op));
});

app.listen(port, () => {
    console.log(`Calculator API is running at http://localhost:${port}`);
});
