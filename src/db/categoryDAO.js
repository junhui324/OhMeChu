import { Category } from './model/index.js';

const categoryDAO = {
  //카테고리 조회 - 사용자가 카테고리 목록을 화면에서 확인할 수 있다.
  findCategory: async () => {
    const category = await Category.find({});
    return category;
  },

  //카테고리 추가 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리를 추가할 수 있다.
  createCategory: async (category) => {
    const addCategory = await Category.create({ category });
    return addCategory;
  },

  //카테고리 수정 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리 관련 데이터 (카테고리 이름 등)를 수정할 수 있다.
  findByIdAndUpdateCategory: async (id, category) => {
    const updateCategory = await Category.findByIdAndUpdate(id, {
      category: category,
    });
    return updateCategory;
  },

  //카테고리 삭제 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리 관련 데이터를 삭제할 수 있다
  findByIdAndDeleteCategory: async (id) => {
    const deleteCategory = await Category.findByIdAndDelete(id);
    return deleteCategory;
  },
};

export { categoryDAO };
