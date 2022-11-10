export class UsuarioModelo{
  //El interrogante "?" me define si una variable puede ser indefinida
    id?: String;
    nombres?: string;
    apellidos?: string;
    correo?: string;
    telefono?: string;
    token?: string;
    username?:string;
    isLoggedIn?: boolean = false;
  }
  