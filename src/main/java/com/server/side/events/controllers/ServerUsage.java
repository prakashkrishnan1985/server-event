package com.server.side.events.controllers;

import java.util.Date;

import lombok.Data;

@Data
public class ServerUsage {
	
	private int serverusage;
	private int memoryUsage;
	private Date date;
	
	public ServerUsage(int serverusage, int memoryUsage, Date date) {
		this.date = date;
		this.memoryUsage = memoryUsage;
		this.serverusage = serverusage;
	}
	
	

}
