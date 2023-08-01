const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p>Email: info@example.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Main St, City, Country</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About Us</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut sem sit amet enim
                malesuada auctor non vitae nisi. Duis dapibus turpis vel odio facilisis, vitae varius
                dui eleifend.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-blue-500">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-blue-500">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-blue-500">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-white hover:text-blue-500">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
            <p>© 2023 Your Company. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  