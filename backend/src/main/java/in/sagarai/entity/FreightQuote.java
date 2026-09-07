package in.sagarai.entity;
import jakarta.persistence.*;
@Entity @Table(name="freight_quotes") public class FreightQuote {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long id; String originPort; String destinationPort; Double cargoTons; Double quotedRate; Double optimizedRate; String currency="INR";
 public Long getId(){return id;} public String getOriginPort(){return originPort;} public void setOriginPort(String v){originPort=v;} public String getDestinationPort(){return destinationPort;} public void setDestinationPort(String v){destinationPort=v;} public Double getCargoTons(){return cargoTons;} public void setCargoTons(Double v){cargoTons=v;} public Double getQuotedRate(){return quotedRate;} public void setQuotedRate(Double v){quotedRate=v;} public Double getOptimizedRate(){return optimizedRate;} public void setOptimizedRate(Double v){optimizedRate=v;} public String getCurrency(){return currency;} public void setCurrency(String v){currency=v;}
}
