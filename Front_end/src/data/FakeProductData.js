// Danh sách sản phẩm
const productList = [
  {
    id: 0,
    name: "Sản phẩm 1",
    date: "2023-08-22",
    image: "/imgs/1-1/img1-4.avif",
    description:
      "Mô tả dài hơn cho sản phẩm 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus libero nec eleifend. Quisque suscipit arcu eget ligula malesuada fermentum. Duis non ex a libero vulputate rhoncus. Vestibulum bibendum, turpis eget dignissim suscipit, ante lectus tincidunt purus, in posuere lectus nunc ac sapien.",
    originalPrice: 50000,
    discountedPrice: 40000,
    categoryId: 1, // ID của danh mục sản phẩm này
  },
  {
    id: 1,
    name: "Sản phẩm 2",
    date: "2023-08-23",
    image: "/imgs/1-2/img2-6.avif",
    description:
      "Mô tả dài hơn cho sản phẩm 2. Ut nec aliquam purus, eget elementum libero. Curabitur lacinia quis nisi sit amet vehicula. Phasellus eleifend felis at elit fermentum euismod. Nulla facilisi. Nunc nec suscipit felis. Aenean commodo velit quis mi varius, in gravida justo feugiat. Cras sed congue augue.",
    originalPrice: 40000,
    discountedPrice: 30000,
    categoryId: 2, // ID của danh mục sản phẩm này
  },
  {
    id: 2,
    name: "Sản phẩm 3",
    date: "2023-01-23",
    image: "/imgs/1-3/img3-4.avif",
    description:
      "Mô tả dài hơn cho sản phẩm 3. Ut nec aliquam purus, eget elementum libero. Curabitur lacinia quis nisi sit amet vehicula. Phasellus eleifend felis at elit fermentum euismod. Nulla facilisi. Nunc nec suscipit felis. Aenean commodo velit quis mi varius, in gravida justo feugiat. Cras sed congue augue.",
    originalPrice: 60000,
    discountedPrice: 55000,
    categoryId: 2, // ID của danh mục sản phẩm này
  },

  {
    id: 3,
    name: "Sản phẩm 4",
    date: "2023-01-23",
    image: "/imgs/1-4/img4-4.avif",
    description:
      "Mô tả dài hơn cho sản phẩm 4. Ut nec aliquam purus, eget elementum libero. Curabitur lacinia quis nisi sit amet vehicula. Phasellus eleifend felis at elit fermentum euismod. Nulla facilisi. Nunc nec suscipit felis. Aenean commodo velit quis mi varius, in gravida justo feugiat. Cras sed congue augue.",
    originalPrice: 60880,
    discountedPrice: 15000,
    categoryId: 2, // ID của danh mục sản phẩm này
  },

  {
    id: 4,
    name: "Sản phẩm 5",
    date: "2023-01-23",
    image: "/imgs/1-5/img5-1.avif",
    description:
      "Mô tả dài hơn cho sản phẩm 3. Ut nec aliquam purus, eget elementum libero. Curabitur lacinia quis nisi sit amet vehicula. Phasellus eleifend felis at elit fermentum euismod. Nulla facilisi. Nunc nec suscipit felis. Aenean commodo velit quis mi varius, in gravida justo feugiat. Cras sed congue augue.",
    originalPrice: 78880,
    discountedPrice: 25000,
    categoryId: 2, // ID của danh mục sản phẩm này
  },
  // Thêm sản phẩm khác ở đây
];
// Danh sách danh mục
const categoryList = [
  {
    id: 1,
    name: "Danh mục",
    subcategories: ["Danh mục con 1", "Danh mục con 2"],
  },
  {
    id: 2,
    name: "Thương hiệu",
    subcategories: ["adidas", "nike", "biti's"],
  },
  {
    id: 3,
    name: "Màu sắc",
    subcategories: ["Xanh", "Đỏ", "Tím"],
  },
  {
    id: 4,
    name: "Kích thước",
    subcategories: ["49", "34", "40"],
  },
  // Thêm danh mục khác ở đây
];

// Xuất hai danh sách để sử dụng trong ứng dụng
export { productList, categoryList };
