package in.sagarai.entity;
import jakarta.persistence.*;
@Entity @Table(name="vessels") public class Vessel {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @Column(nullable=false,unique=true) String imoNumber; String name; String status; Double latitude; Double longitude;
 public Long getId(){return id;} public String getImoNumber(){return imoNumber;} public void setImoNumber(String v){imoNumber=v;} public String getName(){return name;} public void setName(String v){name=v;} public String getStatus(){return status;} public void setStatus(String v){status=v;} public Double getLatitude(){return latitude;} public void setLatitude(Double v){latitude=v;} public Double getLongitude(){return longitude;} public void setLongitude(Double v){longitude=v;}
}
