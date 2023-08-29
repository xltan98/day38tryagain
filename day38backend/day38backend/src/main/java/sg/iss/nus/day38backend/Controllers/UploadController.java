package sg.iss.nus.day38backend.Controllers;

import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonValue;
import sg.iss.nus.day38backend.Respositories.UploadRepository;

@RestController
@CrossOrigin
public class UploadController {

    @Autowired
    UploadRepository uRepo;

    // @GetMapping(path="/audio/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<String>getUrl(@PathVariable String id){
    //     String url=uRepo.getUrl(id);
    //     JsonObject resp=Json.createObjectBuilder()
    //     .add("url",url)
    //     .build();

    //     return ResponseEntity.ok(resp.toString());
    // }

       @PostMapping(path="/audio",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>getUrl(@RequestBody String listOfId){
         JsonObject jId = Json.createReader(new StringReader(listOfId)).readObject();
        JsonArrayBuilder ja=Json.createArrayBuilder();
        List<String> idList=new ArrayList<>();
        JsonArray jsonArray=jId.getJsonArray("id");

        for (JsonValue jsonValue : jsonArray) {
            String id = jsonValue.toString(); // Convert the JSON value to a string
            idList.add(id);
        }
         for(String id:idList){
        id = id.replaceAll("\"", "");
        String url=uRepo.getUrl(id);
        
        ja.add(url);
         }

        return ResponseEntity.ok(ja.build().toString());
    }

    // @PostMapping(path="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    // , produces = MediaType.APPLICATION_JSON_VALUE)
    // public ResponseEntity<String>postUploadToAngular(@RequestPart MultipartFile audioFile){
    //     try{
    //         String mediaType=audioFile.getContentType();
    //         InputStream is=audioFile.getInputStream();

    //        String id= uRepo.saveAudio(audioFile);
    //         System.out.printf("ID>>>>>%s",id);
    //         JsonObject resp=Json.createObjectBuilder().add("id",id).build();
    //         return ResponseEntity.ok(resp.toString());

    //     }catch(IOException ex){
    //         JsonObject resp=Json.createObjectBuilder()
    //         .add("error",ex.getMessage()).build();

    //         return ResponseEntity.status(500).body(resp.toString());
         
    //     }
    // }

     @PostMapping(path="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String>postUploadToAngular(@RequestPart MultipartFile[] audioFile){
        try{
            JsonArrayBuilder ja=Json.createArrayBuilder();
            for(MultipartFile a:audioFile){
            String mediaType=a.getContentType();
            InputStream is=a.getInputStream();

           String id= uRepo.saveAudio(a);
            System.out.printf("ID>>>>>%s",id);
            JsonObject resp=Json.createObjectBuilder().add("id",id).build();
            ja.add(resp);
            }
            return ResponseEntity.ok(ja.build().toString());
            

        }catch(IOException ex){
            JsonObject resp=Json.createObjectBuilder()
            .add("error",ex.getMessage()).build();

            return ResponseEntity.status(500).body(resp.toString());
         
        }
    }
    
}
