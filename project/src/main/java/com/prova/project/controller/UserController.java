package com.prova.project.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.prova.project.entity.FileInfo;
import com.prova.project.entity.User;
import com.prova.project.message.ResponseMessage;
import com.prova.project.repository.UserRepository;
import com.prova.project.service.FilesStorageService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	FilesStorageService storageService;

	@GetMapping("/getTableData")
	public @ResponseBody List<User> tabellaDatiDellUtente() {

		List<User> tableUser = (List<User>) userRepository.findAll();

		return tableUser;
	}

	@PostMapping("/upload")
	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			storageService.save(file);

			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}

	@GetMapping("/files")
	public ResponseEntity<List<FileInfo>> getListFiles() {
		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
			String filename = path.getFileName().toString();
			String url = MvcUriComponentsBuilder
					.fromMethodName(UserController.class, "getFile", path.getFileName().toString()).build().toString();

			return new FileInfo(filename, url);
		}).collect(Collectors.toList());

		return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
	}

	@DeleteMapping("/deleteFiles")
	public void deleteFiles() {

		System.out.println("entro qui dentro?");

		storageService.deleteAll();

	}

	@DeleteMapping("/deleteSingleFile/{filename}")
	public void deleteSingleFile(@PathVariable String filename) {

		//System.out.println("stampo il filename in arrivo: " + filename);
		
		//String fileToBeDeleted = filename.replaceAll("[^A-Za-z0-9]", "");
		
		String fileToBeDeleted = "";
		
		//System.out.println("stampo " + fileToBeDeleted);

		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
			String filenameOriginal = path.getFileName().toString();
			String url = MvcUriComponentsBuilder
					.fromMethodName(UserController.class, "getFile", path.getFileName().toString()).build().toString();

			return new FileInfo(filenameOriginal, url);
		}).collect(Collectors.toList());

		for (int i = 0; i < fileInfos.size(); i++) {

			//System.out.println("stampo nome 1 " + fileInfos.get(i).getName());
			
			if (('"' + fileInfos.get(i).getName() + '"').equals(filename)) {

				//System.out.println("CAZZOOOOOO " + fileInfos.get(i).getName());
				
				//fileInfos.remove(i);
				
				fileToBeDeleted = fileInfos.get(i).getName();
			}
	
		}
		
		System.out.println("stampo " + fileToBeDeleted);
		
		storageService.delete(fileToBeDeleted);
		
		/*
		for (int i = 0; i < fileInfos.size(); i++) {
			
			System.out.println("stampo nome 2 " + fileInfos.get(i).getName());

			if (fileInfos.get(i).getName().equals(filename)) {

				System.out.println("stampo nome " + fileInfos.get(i).getName());
			}

		}
		*/
		
	}

	@GetMapping("/files/{filename:.+}")
	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
		Resource file = storageService.load(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

}