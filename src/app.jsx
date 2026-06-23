import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      if (!response.ok) {
        throw new Error('Error al consultar la API');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError('No se pudo cargar la imagen.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          Random dog image
        </h1>

        <p className="mt-2 text-gray-500">
          Esta aplicación consume la Dog CEO API usando useEffect.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6 min-h-64 flex items-center justify-center">
          {isLoading && <p className="text-gray-500">Cargando imagen...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!isLoading && !error && data && (
            <img
              src={data.message}
              alt="Random dog"
              className="rounded-lg max-h-80 w-full object-cover"
            />
          )}
        </div>

        <button
          onClick={fetchData}
          disabled={isLoading}
          className="mt-6 rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Consultando...' : 'Consultar de nuevo'}
        </button>
      </section>
    </main>
  );
}

export default App;