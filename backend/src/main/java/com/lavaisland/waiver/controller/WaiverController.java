package com.lavaisland.waiver.controller;

import com.lavaisland.waiver.model.Waiver;
import com.lavaisland.waiver.service.WaiverService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/waivers")
@CrossOrigin(origins = "http://localhost:5173")
public class WaiverController {

    private final WaiverService waiverService;

    public WaiverController(WaiverService waiverService) {
        this.waiverService = waiverService;
    }

    @PostMapping
    public Waiver createWaiver(@Valid @RequestBody Waiver waiver) {
        return waiverService.createWaiver(waiver);
    }

    @GetMapping
    public List<Waiver> getAllWaivers() {
        return waiverService.getAllWaivers();
    }

    @GetMapping("/search/parent")
    public List<Waiver> searchByParentLastName(@RequestParam String lastName) {
        return waiverService.searchByParentLastName(lastName);
    }

    @GetMapping("/search/participant")
    public List<Waiver> searchByParticipantLastName(@RequestParam String lastName) {
        return waiverService.searchByParticipantLastName(lastName);
    }

    @GetMapping("/code/{confirmationCode}")
    public Waiver getByConfirmationCode(@PathVariable String confirmationCode) {
        return waiverService.findByConfirmationCode(confirmationCode);
    }
}