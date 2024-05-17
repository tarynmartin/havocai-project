import Button from '@mui/material/Button';

const DownloadCSV = ({ data, fileName, buttonText }) => {
  const downloadCSV = () => {
    const csvData = new Blob([data], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={downloadCSV} variant='contained'>{buttonText}</Button>
  );
}

export default DownloadCSV;
