//imports
import React from 'react';

const TailwindExample = () => {
  //standard

  //state

  //function

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Flex Column Example */}
        <section className="flex flex-col items-center p-8 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-4">Flex Column Layout</h2>
          <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg w-1/2">
            <div className="bg-blue-500 text-white p-4 mb-4 w-full text-center">
              Item 1
            </div>
            <div className="bg-blue-500 text-white p-4 mb-4 w-full text-center">
              Item 2
            </div>
            <div className="bg-blue-500 text-white p-4 w-full text-center">
              Item 3
            </div>
          </div>
          <p className="mt-4 text-lg">
            This is how a <span className="font-bold">flex-column</span> layout
            looks using Tailwind CSS's `flex-col` utility.
          </p>
        </section>

        {/* Flex Row Example */}
        <section className="flex flex-col items-center p-8 bg-white">
          <h2 className="text-3xl font-semibold mb-4">Flex Row Layout</h2>
          <div className="flex flex-row justify-between bg-gray-100 p-4 rounded-lg shadow-lg w-1/2">
            <div className="bg-green-500 text-white p-4 w-1/3 text-center">
              Item 1
            </div>
            <div className="bg-green-500 text-white p-4 w-1/3 text-center">
              Item 2
            </div>
            <div className="bg-green-500 text-white p-4 w-1/3 text-center">
              Item 3
            </div>
          </div>
          <p className="mt-4 text-lg">
            This is how a <span className="font-bold">flex-row</span> layout
            looks using Tailwind CSS's `flex-row` utility.
          </p>
        </section>

        {/* Grid Example */}
        <section className="flex flex-col items-center p-8 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-4">Grid Layout</h2>
          <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-lg w-1/2">
            <div className="bg-red-500 text-white p-4 text-center">Item 1</div>
            <div className="bg-red-500 text-white p-4 text-center">Item 2</div>
            <div className="bg-red-500 text-white p-4 text-center">Item 3</div>
            <div className="bg-red-500 text-white p-4 text-center">Item 4</div>
            <div className="bg-red-500 text-white p-4 text-center">Item 5</div>
            <div className="bg-red-500 text-white p-4 text-center">Item 6</div>
          </div>
          <p className="mt-4 text-lg">
            This is how a <span className="font-bold">grid layout</span> looks
            using Tailwind CSS's `grid-cols-3` utility.
          </p>
        </section>

        {/* Responsive Typography Example */}
        <section className="flex flex-col items-center p-8 bg-white">
          <h2 className="text-3xl font-semibold mb-4">Responsive Typography</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-1/2 text-center">
            <h3 className="text-sm md:text-lg lg:text-2xl text-blue-600">
              This text adjusts with screen size
            </h3>
            <p className="mt-4 text-gray-700">
              Use Tailwind CSS's responsive typography classes like `text-sm`,
              `text-lg`, and `text-2xl` to create flexible text sizes that adapt
              to the screen size.
            </p>
          </div>
        </section>

        {/* Box Shadows and Borders Example */}
        <section className="flex flex-col items-center p-8 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-4">
            Box Shadows and Borders
          </h2>
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
              <p className="text-center">Shadow with Border</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-center">Deep Shadow</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-none">
              <p className="text-center">No Shadow</p>
            </div>
          </div>
          <p className="mt-4 text-lg">
            This example demonstrates Tailwind CSS's utilities for{' '}
            <span className="font-bold">shadows</span> and{' '}
            <span className="font-bold">borders</span>.
          </p>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-6 mt-8 text-center">
          <p>&copy; 2024 Roshoon. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};


export default TailwindExample;