package com.lavaisland.waiver.exception;

public class WaiverNotFoundException extends RuntimeException {

    public WaiverNotFoundException(String confirmationCode) {
        super("Waiver not found with confirmation code: " + confirmationCode);
    }
}