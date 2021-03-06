// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB1WSUFOys_2XEvSEncseuMiIdmc2TT_Oo",
    authDomain: "teste-firebase-6e591.firebaseapp.com",
    projectId: "teste-firebase-6e591",
    storageBucket: "teste-firebase-6e591.appspot.com",
    messagingSenderId: "830856975516",
    appId: "1:830856975516:web:cef2b55e7449f2fca30959",
    measurementId: "G-V3Y7C2YMHX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Criação da variável pra acessar o banco de dados
let db = firebase.firestore();

function ler() {
    
    db.collection('info').get()
    .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            console.log(doc.data());
        })
    }).catch((err)=>{
        console.log('Permissão insuficiente. Favor realizar login.');
    })
}

function escrever() {
   
    db.collection('info')
    .add({ title: 'Novo Objeto', number: Math.random() })
    .then((doc) => {
        console.log(doc);
    })
    .catch((error) => {
        console.log(error);
    })
}

let auth = firebase.auth();

function createUser() {
    let newUserEmail = "novoteste@teste.com";
    let newUserPassword = "123abc";

    auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword)
    .then((user)=>{
        console.log(user);
    }).catch((error)=>{
        console.log(error);
    })
}

function login() {
    let userEmail = "novoteste@teste.com";
    let userPassword = "123abc";

    //Essa linha serve pra setar a persistência do login. Temos 3 opções: LOCAL (persiste em todo o browser, independente se abrir o site em outra aba, janela, etc), SESSION (só funciona naquela aba ou janela, se abrir outra, estará deslogado) e NONE (atualizando a página, mesmo que seja na mesma janela, desloga).
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=>{
        auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then((loggedUser) => {
            console.log(auth.currentUser);
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    })
}

// Método pra saber se existe ou não um usuário logado
auth.onAuthStateChanged((user) => {
    if(user){
        console.log('Usuário logado.')
    } else {
        console.log('Ninguém logado.')
    }
})

function logout() {
    auth.signOut()
    .then((obj) => {
        console.log('Usuário foi deslogado.');
    })
    .catch(err => {
        console.log(err);
    })
}

// setTimeout(login, 2000);