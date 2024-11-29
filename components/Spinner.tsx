// import React from 'react';

// const Spinner = () => {
//   const colors = [
//     'bg-gray-500',
//     'bg-gray-500',
//     'bg-gray-500'
//   ];

//   return (
//     <div className="flex space-x-2 justify-center items-center bg-slate-50 h-screen">
//       {colors.map((color, index) => (
//         <div
//           key={index}
//           className={`${color} h-3 w-3 animate-spinner-grow rounded-full opacity-0`}
//           role="status"
//         >
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Spinner;

import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center space-x-4 w-full h-20">
      <div
        className="h-8 w-8 rounded-full bg-red-500 animate-spinner-grow animate-left-to-right"
        style={{ animationDelay: '0s' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="h-8 w-8 rounded-full bg-green-500 animate-spinner-grow animate-left-to-right"
        style={{ animationDelay: '0.2s' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="h-8 w-8 rounded-full bg-blue-500 animate-spinner-grow animate-left-to-right"
        style={{ animationDelay: '0.4s' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
