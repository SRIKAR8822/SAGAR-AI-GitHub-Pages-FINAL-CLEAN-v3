package in.sagarai.entity;
import jakarta.persistence.*;
@Entity @Table(name="ports") public class Port {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; @Column(nullable=false,unique=true) String code; String name; String city; String congestionLevel;
 public Long getId(){return id;} public String getCode(){return code;} public void setCode(String v){code=v;} public String getName(){return name;} public void setName(String v){name=v;} public String getCity(){return city;} public void setCity(String v){city=v;} public String getCongestionLevel(){return congestionLevel;} public void setCongestionLevel(String v){congestionLevel=v;}
}
