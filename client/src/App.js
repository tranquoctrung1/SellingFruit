import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Layout from './layout/layout';

function App() {
    useEffect(() => {
        document.title = 'Selling Fruits | Nhất Nam Food';
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route path="/*" element={<Layout />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
