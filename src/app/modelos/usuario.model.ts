export class UsuarioModelo{
  //El interrogante "?" me define si una variable puede ser indefinida
    id?: String;
    nombres?: String;
    apellidos?: string;
    correo?: string;
    telefono?: string;
    token?: string;
    isLoggedIn?: boolean = false;
  }
  