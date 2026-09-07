package in.sagarai.service;
import in.sagarai.entity.FreightQuote; import in.sagarai.repository.FreightQuoteRepository; import org.springframework.stereotype.Service; import java.util.List;
@Service public class FreightService { private final FreightQuoteRepository repo; public FreightService(FreightQuoteRepository r){repo=r;} public List<FreightQuote> all(){return repo.findAll();} public FreightQuote optimize(FreightQuote q){ if(q.getQuotedRate()!=null) q.setOptimizedRate(Math.max(0,q.getQuotedRate()*0.92)); return repo.save(q);} }
