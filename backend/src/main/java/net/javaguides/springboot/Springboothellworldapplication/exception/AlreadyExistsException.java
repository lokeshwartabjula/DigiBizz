package net.javaguides.springboot.Springboothellworldapplication.exception;


public class AlreadyExistsException extends RuntimeException {

    public AlreadyExistsException(String message) {
        super(message);
    }
}
