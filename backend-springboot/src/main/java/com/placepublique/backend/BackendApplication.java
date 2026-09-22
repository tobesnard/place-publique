package com.placepublique.backend;

import java.io.IOException;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:4200" })
public class BackendApplication {

	private static AppVersionService appVersionService;
	private static AppConfigService appConfigService;

	public BackendApplication(AppVersionService appVersionService, AppConfigService appConfigService) {
		BackendApplication.appVersionService = appVersionService;
		BackendApplication.appConfigService = appConfigService;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping("/")
	public Map<String, Object> home() throws IOException {
		return appVersionService.getVersion();
	}

	@GetMapping("version")
	public Map<String, Object> version() throws IOException {
		return appVersionService.getVersion();
	}

	@GetMapping("config")
	public Map<String, Object> getConfig(@RequestParam(value = "param", defaultValue = "") String param)
			throws IOException {
		return appConfigService.getConfig(param);
	}

}
