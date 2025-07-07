// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Form, Input, Button, Alert } from 'antd';
// import loginBackground from '../assets/loginBackground.jpg';

// const Login: React.FC = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [isRegistering] = useState(false);
//     const [status, setStatus] = useState<'success' | 'error' | ''>('');
//     const navigate = useNavigate();

//     const handleSubmit = async () => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/login', {
//                 username,
//                 password,
//             });
//             localStorage.setItem('token', response.data.access_token);
//             setMessage('Login successful');
//             setStatus('success');
//             setTimeout(() => {
//                 setMessage('');
//                 setStatus('');
//                 navigate('/home');
//             }, 20000000)
//         } catch (error) {
//             setStatus('error');
//             setMessage('Credentials are wrong');
//             setTimeout(() => {
//                 setMessage('');
//                 setStatus('');
//             }, 2000);
//         }
//     };

//     return (
//         <div
//             className="flex justify-center items-center h-screen bg-cover bg-center relative"
//             style={{ backgroundImage: `url(${loginBackground})` }}
//         >
//             {status && (
//                 <Alert
//                     message={message}
//                     type={status}
//                     showIcon
//                     style={{
//                         position: 'absolute',
//                         top: '20px',
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                         zIndex: 1000,
//                         width: message === 'Login successful' ? '50x' : '210px',
//                         textAlign: 'center',
//                         color: status === 'success' ? 'black' : '',
//                     }}
//                 />
//             )}

//             <div
//                 className={`relative w-96 h-[450px] border-2 border-white/40 rounded-2xl backdrop-blur-xs shadow-[15px_15px_25px_rgba(0,0,0,0.4)] flex flex-col justify-center items-center ml-230 perspective-1000 ${isRegistering ? 'flip' : ''}`}
//             >
//                 <div className="absolute w-full h-full rounded-2xl bg-transparent backface-hidden transition-transform duration-700 ease-in-out flex justify-center items-center">
//                     <Form onFinish={handleSubmit} className="w-full text-center">
//                         <h2 className="font-schoolbell text-xl font-bold text-[#d9ddec] mb-4">Login</h2>
//                         <Form.Item name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
//                             <Input
//                                 style={{ width: '300px', backgroundColor: 'transparent' }}
//                                 className="h-11 rounded-xl border border-black placeholder-[#8C0303] placeholder:font-bold focus:border-aqua hover:border-aqua"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 placeholder="Username"
//                             />
//                         </Form.Item>
//                         <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
//                             <Input.Password
//                                 style={{ width: '300px', backgroundColor: 'transparent' }}
//                                 className="h-11 rounded-xl border border-black placeholder-[#8C0303] placeholder:font-bold focus:border-aqua hover:border-aqua"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 placeholder="Password"
//                             />
//                         </Form.Item>
//                         <Form.Item>
//                             <Button
//                                 htmlType="submit"
//                             >
//                                 Submit
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;






















import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'antd';
import { z } from 'zod';
import loginBackground from '../assets/loginBackground.jpg';

// Define Zod schemas
const loginSchema = z.object({
    username: z.number().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
});

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
});

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'success' | 'error' | ''>('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const handleSubmit = async () => {
        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setFormErrors({
                username: fieldErrors.username?.[0] || '',
                password: fieldErrors.password?.[0] || ''
            });
            const errorMessage = [
                fieldErrors.username?.[0],
                fieldErrors.password?.[0]
            ].filter(Boolean).join(' | ');
            console.log('errormessage', errorMessage);

            setMessage(errorMessage);
            setStatus('error');
        }

        setFormErrors({});
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', { username, password });
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('name', response.data.name)
            setMessage('Login Successful');
            setStatus('success');
            setTimeout(() => {
                setMessage('');
                setStatus('');
                navigate('/home');
            }, 1000);
        } catch (error) {
            setStatus('error');
            setMessage('Credentials are wrong');
            setTimeout(() => {
                setMessage('');
                setStatus('');
            }, 2000);
        }
    };

    const handleRegisterSubmit = async () => {
        const result = registerSchema.safeParse({ name, username, password });
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setFormErrors({
                name: fieldErrors.name?.[0] || '',
                username: fieldErrors.username?.[0] || '',
                password: fieldErrors.password?.[0] || ''
            });
            return;
        }

        setFormErrors({});
        try {
            const reqBody = { name, username, password };
            await axios.post('http://localhost:5566/user/createUser', reqBody);
            setMessage('Registration successful');
            setStatus('success');
            setIsRegistering(false);
            setTimeout(() => {
                setMessage('');
                setStatus('');
            }, 2000);
        } catch (error) {
            setStatus('error');
            setMessage('Registration failed');
        }
    };

    return (
        <div
            className="h-screen flex justify-center items-center relative"
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                perspective: '1000px'
            }}
        >
            {status && (
                <Alert
                    message={message}
                    type={status}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        width: message === 'Credentials are wrong' ? '200px' : '170px',
                        textAlign: 'center',
                        color: status === 'success' ? 'black' : '',
                    }}
                    showIcon
                    className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 w-60 text-center"
                />
            )}

            <div
                className="relative w-[400px] h-[500px] ml-auto mr-20"
                style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: isRegistering ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Login */}
                <div
                    className="absolute w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(3px)'
                    }}
                >
                    <Form onFinish={handleSubmit} className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-white">Login</h2>
                        <Form.Item validateStatus={formErrors.username ? 'error' : ''} help={formErrors.username}>
                            {/* <Input
                                style={{ width: '300px', backgroundColor: 'transparent' }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            /> */}
                            <input
                                className="bg-transparent w-[300px] border border-gray-300 rounded px-3 py-1 text-amber-50"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />

                        </Form.Item>
                        <Form.Item validateStatus={formErrors.password ? 'error' : ''} help={formErrors.password}>
                            <input
                                className="bg-transparent w-[300px] border border-gray-300 rounded px-3 py-1 text-amber-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Button htmlType="submit"
                            style={{ backgroundColor: 'transparent' }}
                            className="bg-black text-white font-bold border border-red-500 w-25">
                            Submit
                        </Button>
                        <p>
                            Don&apos;t have an account?{' '}
                            <button type="button" onClick={() => setIsRegistering(true)} className="text-orange-600 font-bold underline">
                                Register Here
                            </button>
                        </p>
                    </Form>
                </div>

                {/* Register */}
                <div
                    className="absolute w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-center"
                    style={{
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(3px)'
                    }}
                >
                    <Form onFinish={handleRegisterSubmit} className="space-y-4 text-center">
                        <h2 className="text-3xl font-bold text-white">Register Account</h2>
                        <Form.Item validateStatus={formErrors.name ? 'error' : ''} help={formErrors.name}>
                            <input
                                className="bg-transparent w-[300px] border border-gray-300 rounded px-3 py-1 text-amber-50"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </Form.Item>
                        <Form.Item validateStatus={formErrors.username ? 'error' : ''} help={formErrors.username}>
                            <input
                                className="bg-transparent w-[300px] border border-gray-300 rounded px-3 py-1 text-amber-50"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item validateStatus={formErrors.password ? 'error' : ''} help={formErrors.password}>
                            <input
                                className="bg-transparent w-[300px] border border-gray-300 rounded px-3 py-1 text-amber-50"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Button htmlType="submit" className="bg-black text-white font-bold border border-red-500 w-24">
                            Register
                        </Button>
                        <p>
                            Already have an account?{' '}
                            <button type="button" onClick={() => setIsRegistering(false)} className="text-cyan-400 font-bold underline">
                                Login Here
                            </button>
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
