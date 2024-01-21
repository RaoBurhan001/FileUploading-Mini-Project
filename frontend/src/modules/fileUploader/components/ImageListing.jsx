import PropTypes from 'prop-types';
const ImageListing = ({ images, onDelete, isDeleted }) => {
  return (
    <div className="flex flex-wrap mt-6">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          className="relative m-2 bg-white p-3 rounded-md shadow-md"
        >
          <img
            src={imageUrl?.preview || imageUrl}
            alt={`Image ${index}`}
            className="w-24 h-24 object-cover mb-2"
          />
          {isDeleted && (
            <button
              onClick={() => onDelete(index)}
              className="text-red-600 hover:text-red-800 mt-2 block"
            >
              <svg
                className="w-4 h-4 inline-block mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};


ImageListing.propTypes = {
    images: PropTypes.array,
    onDelete: PropTypes.func,
    isDeleted: PropTypes.bool,
  }; 
export default ImageListing;
