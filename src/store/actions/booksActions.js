import * as actions from './actionTypes';

// Add book
export const addBook = data => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const user = {
    name: getState().firebase.profile.firstName,
    lastName: getState().firebase.profile.lastName
  };
  dispatch({type: actions.ADD_BOOK_START});
  try {
    const res = await firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').get();
    const newBook = {
      id: new Date().valueOf(),
      bookAuthor: data.bookAuthor,
      bookName: data.bookName,
      items: Number(data.items),
      location: 'office',
      renter: [],
      category: data.category,
      user
    };

    if (!res.data()) {
      firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').set({
        books: [
          newBook
        ]
      });
    } else {
      firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').update({
        books: [
          ...res.data().books,
          newBook
        ]
      });
    }

    dispatch({type: actions.ADD_BOOK_SUCCESS});
    return true;
  } catch (err) {
    dispatch({type: actions.ADD_BOOK_FAIL, payload: err.message});
  }
};

// Rent book
export const rentBook = (bookId) => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  const firstName = getState().firebase.profile.firstName;
  const lastName = getState().firebase.profile.lastName;
  const res = await firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').get();
  const books = res.data().books;
  const index = books.findIndex(book => book.id === bookId);
  const newRenter = {
    userId,
    firstName,
    lastName
  };
  books[index].renter = [
    ...books[index].renter,
    newRenter
  ];
  books[index].items = books[index].items - 1;

  await firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').set({
    books
  });
};

// Return book
export const returntBook = (bookId) => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  const res = await firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').get();
  const books = res.data().books;
  const index = books.findIndex(book => book.id === bookId);
  const userIndex = books[index].renter.findIndex(user => user.userId === userId);

  books[index].renter = [
    ...books[index].renter.slice(0, userIndex),
    ...books[index].renter.slice(userIndex + 1),
  ];

  books[index].items = books[index].items + 1;

  await firestore.collection('books').doc('HcDMDWiNBUTVf5Urkid6').set({
    books
  });
};