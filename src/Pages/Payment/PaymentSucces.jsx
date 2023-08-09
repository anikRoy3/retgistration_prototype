import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom if you're using it


const PaymentSuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
                <img src='https://funtura.in/tvm/wp-content/themes/funtura/assets/images/success.svg' alt="Success" className="mx-auto w-16 h-16 mb-4" />
                <h2 className="text-2xl font-semibold text-center mb-4">Payment Successful!</h2>
                <p className="text-gray-600 text-center mb-6">
                    Your payment has been successfully processed. Thank you for your order!
                </p>
                <div className="flex justify-center">
                    <Link to="/orderHistory">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                            Go to Order History
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
