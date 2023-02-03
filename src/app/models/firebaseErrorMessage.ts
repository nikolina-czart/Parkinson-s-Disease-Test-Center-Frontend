export enum FirebaseErrorMessage {
  USER_NOT_FOUND = "Nie ma użytkownika o podanej wartości email",
  UID_ALREADY_EXISTS = "Podany uidelement jest już używany przez istniejącego użytkownika. Każdy użytkownik musi mieć unikalny uid.",
  WRONG_PASSWORD = "Hasło jest nieprawidłowe lub użytkownik nie ma hasła",
  EMAIL_ALREADY_EXISTS = "Podany adres e-mail jest już używany przez istniejącego użytkownika. Każdy użytkownik musi mieć unikalny adres e-mail.",
  TOO_MANY_REQUEST = "Dostęp do tego konta został tymczasowo wyłączony z powodu wielu nieudanych prób logowania. Możesz go natychmiast przywrócić resetując swoje hasło lub spróbować ponownie później",
  EMAIL_ALREADY_IN_USE = "Podany adres e-mail jest już używany przez istniejącego użytkownika. Każdy użytkownik musi mieć unikalny adres e-mail.",
}

