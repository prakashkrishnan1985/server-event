package com.server.side.events.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reactor.core.publisher.Flux;

import org.springframework.http.MediaType;

import java.time.Duration;
import java.util.*;


@RestController
public class Performance {
	
	
	@CrossOrigin(allowedHeaders="*")
	@GetMapping(value="get-performance", produces=MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<ServerUsage> getServerUsage(){
		Random random = new Random();
		
		
		return Flux.interval(Duration.ofSeconds(3))
					.map(t-> new ServerUsage(Math.abs(random.nextInt(101)), Math.abs(random.nextInt(101)), new Date()));
		
	}

}
