import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Loading from '../Components/Loading';

const EditUserInfoPage = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    fetch('http://localhost:5000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You may include any authentication headers if needed
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
        // Set form values using setValue
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('phone', data.phone);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, [setValue]);

  const onSubmit = (data) => {
    // Send updated user data to the API
    fetch('http://localhost:5000/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // You may include any authentication headers if needed
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('User data updated:', data);
        // Optionally, you can show a success message to the user
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        // Optionally, you can show an error message to the user
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Edit User Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="email" className="form-input" />}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="text" className="form-input" />}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfoPage;
