package ua.lviv.iot.algo.part1.controller;

import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.algo.part1.mappers.TrolleybusMapper;
import ua.lviv.iot.algo.part1.model.Trolleybus;
import ua.lviv.iot.algo.part1.modelDTO.TrolleybusDTO;
import ua.lviv.iot.algo.part1.service.TrolleybusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;


import java.util.LinkedList;
import java.util.List;
@CrossOrigin(origins = "*")
@RequestMapping("/trolleybuses")
@RestController
public class TrolleybusController {

    @Autowired
    private TrolleybusService trolleybusService;

    @Autowired
    private TrolleybusMapper trolleybusMapper;

    public static final ResponseEntity OK = ResponseEntity
            .status(HttpStatusCode.valueOf(200)).build();

    public static final ResponseEntity FAILURE = ResponseEntity
            .status(HttpStatusCode.valueOf(404)).build();

    @GetMapping
    public ResponseEntity getAllTrolleybuses() {
        List<TrolleybusDTO> response = new LinkedList<>();
        for (Trolleybus trolleybus : trolleybusService.giveAll()) {
            response.add(trolleybusMapper.map(trolleybus));
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getTrolleybus(
            final @PathVariable("id") int trolleybusId) {
        if (!trolleybusService.hasTrolleybusWith(trolleybusId)) {
            return FAILURE;
        } else {
            return ResponseEntity.ok(trolleybusMapper.map(trolleybusService
                    .giveTrolleybus(trolleybusId)));
        }
    }
    @PostMapping
    public ResponseEntity createTrolleybus(
            final @RequestBody TrolleybusDTO trolleybus) {
         ResponseEntity.ok(trolleybusMapper.map(
                trolleybusService.addTrolleybus(
                        trolleybusMapper.map(trolleybus))));
        List<TrolleybusDTO> response = new LinkedList<>();
        for (Trolleybus trolleybus2 : trolleybusService.giveAll()) {
            response.add(trolleybusMapper.map(trolleybus2));
        }
        return ResponseEntity.ok(response);
    }

    @CrossOrigin
    @DeleteMapping(path = "/{id}")
    public ResponseEntity deleteTrolleybus(
            final @PathVariable("id") int trolleybus) {
        if (!trolleybusService.hasTrolleybusWith(trolleybus)) {
            return FAILURE;
        } else {
           return ResponseEntity.ok(trolleybusMapper.map(
                   trolleybusService.deleteTrolleybus(trolleybus)));
        }
    }

    @CrossOrigin
    @PutMapping(path = "/{id}")
    public ResponseEntity updateTrolleybus(
            final @PathVariable("id") int trolleybusId,
            final @RequestBody TrolleybusDTO trolleybus) {
        if (trolleybusService.hasTrolleybusWith(trolleybusId)) {
            trolleybusService.replaceTrolleybus(
                    trolleybusMapper.map(trolleybus), trolleybusId);
            List<TrolleybusDTO> response = new LinkedList<>();
            for (Trolleybus trolleybus2 : trolleybusService.giveAll()) {
                response.add(trolleybusMapper.map(trolleybus2));
            }
            return ResponseEntity.ok(response);
        } else {
            return FAILURE;
        }
    }
}
