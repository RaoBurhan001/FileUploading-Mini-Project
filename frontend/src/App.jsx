
import FileUploader from './modules/fileUploader/containers/FileUploader';

const App = () => {
  return (
    <div className="bg-black-200">
      <header className="bg-blue-500 py-2">
        <h1 className="text-white text-2xl font-bold text-center">
          Upload image
        </h1>
      </header>
      <FileUploader />
    </div>
  );
};

export default App;
