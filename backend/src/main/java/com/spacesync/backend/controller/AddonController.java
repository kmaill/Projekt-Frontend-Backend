package com.spacesync.backend.controller;

import com.spacesync.backend.model.Addon;
import com.spacesync.backend.repository.AddonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addons")
@CrossOrigin(origins = "http://localhost:5173")
public class AddonController {

    @Autowired
    private AddonRepository addonRepository;

    // READ
    @GetMapping
    public List<Addon> getAllAddons() {
        return addonRepository.findAll();
    }

    // CREATE
    @PostMapping
    public Addon createAddon(@RequestBody Addon addon) {
        return addonRepository.save(addon);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public Addon getAddonById(@PathVariable Long id) {
        return addonRepository.findById(id).orElseThrow(() -> new RuntimeException("No addon of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Addon updateAddon(@PathVariable Long id, @RequestBody Addon addonDetails) {
        Addon existingAddon = addonRepository.findById(id).orElseThrow(() -> new RuntimeException("No addon of id: " + id));
        
        existingAddon.setName(addonDetails.getName());
        existingAddon.setPrice(addonDetails.getPrice());
        existingAddon.setBillingType(addonDetails.getBillingType());
        
        return addonRepository.save(existingAddon);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteAddon(@PathVariable Long id) {
        Addon existingAddon = addonRepository.findById(id).orElseThrow(() -> new RuntimeException("No addon of id: " + id));
        
        addonRepository.delete(existingAddon);
    }
}