const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const size = [];

for (let i = 1; i <= 50; i++) {
  // Tạo 50 đối tượng size ngẫu nhiên
  const newSize = {
    id: i,
    sanPham: getRandomInt(0, 5), // Số ngẫu nhiên từ 1 đến 5
    mauSac: getRandomInt(1, 4), // Số ngẫu nhiên từ 1 đến 5
    soLuong: getRandomInt(1, 100), // Số ngẫu nhiên từ 1 đến 100 (số lượng)
    giaTri: getRandomInt(20, 50), // Số ngẫu nhiên từ 10 đến 100 (giá trị)
    giaBan: getRandomInt(50000, 1500000), // Số ngẫu nhiên từ 50,000 đến 150,000 (giá bán)
  };
  size.push(newSize);
}
export default size;
