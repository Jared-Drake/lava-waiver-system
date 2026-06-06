package com.lavaisland.waiver.controller;

import com.lavaisland.waiver.dto.WaiverCreateRequest;
import com.lavaisland.waiver.dto.WaiverResponse;
import com.lavaisland.waiver.service.WaiverService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

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
    public WaiverResponse createWaiver(@Valid @RequestBody WaiverCreateRequest request) {
        return waiverService.createWaiver(request);
    }

    @GetMapping
    public List<WaiverResponse> getAllWaivers() {
        return waiverService.getAllWaivers();
    }

    @GetMapping("/search/parent")
    public List<WaiverResponse> searchByParentLastName(@RequestParam String lastName) {
        return waiverService.searchByParentLastName(lastName);
    }

    @GetMapping("/search/participant")
    public List<WaiverResponse> searchByParticipantLastName(@RequestParam String lastName) {
        return waiverService.searchByParticipantLastName(lastName);
    }

    @GetMapping("/code/{confirmationCode}")
    public WaiverResponse getByConfirmationCode(@PathVariable String confirmationCode) {
        return waiverService.findByConfirmationCode(confirmationCode);
    }
}