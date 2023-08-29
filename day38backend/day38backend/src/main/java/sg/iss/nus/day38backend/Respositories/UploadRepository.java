package sg.iss.nus.day38backend.Respositories;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

@Repository
public class UploadRepository {

    @Autowired 
    private AmazonS3 s3;

    public String saveAudio(MultipartFile uploadFile){
        //Map<String,String> userData=new HashMap<>()

        ObjectMetadata metadata=new ObjectMetadata();
        metadata.setContentType(uploadFile.getContentType());
        metadata.setContentLength(uploadFile.getSize());

        String id = UUID.randomUUID().toString().substring(0, 8);


        try{
            PutObjectRequest putRequest=new PutObjectRequest("xinlitan98","%s".formatted(id),uploadFile.getInputStream(),metadata);
            putRequest = putRequest.withCannedAcl(CannedAccessControlList.PublicRead);
            PutObjectResult result = s3.putObject(putRequest);
            System.out.printf(">>>>result:%s".formatted(result));
        }catch (IOException ex){
            ex.printStackTrace();
        }return id;

    }

    public String getUrl(String id){
        String key="%s".formatted(id);
        return s3.getUrl("xinlitan98",key).toString();

    }
    
}
