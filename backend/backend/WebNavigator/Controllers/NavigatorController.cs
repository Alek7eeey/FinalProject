using backend.DataAccess.DataAccess.Entity;
using backend.DTO;
using backend.WebNavigator.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("navigator")]
    public class NavigatorController : Controller
    {
        private readonly INodeService _nodeService;
        private readonly IEntryService _entryService;

        public NavigatorController(INodeService nodeService, IEntryService entryService)
        {
            _nodeService = nodeService;
            _entryService = entryService;
        }

        //Get: navigator/nodes
        [HttpGet("nodes")]
        public async Task<ActionResult> Index()
        {
            var nodes = await _nodeService.GetNodes();
            return Ok(nodes);
        }

        //Post: navigator/createNode
        [HttpPost("createNode")]
        public async Task<ActionResult> CreateNode([FromBody] NodeFromServer newNode)
        {
            var node = new Node()
            {
                Name = newNode.Name,
                ParentName = newNode.ParentName,
                Type = newNode.Type
            };

            if (await _nodeService.AddNode(node) == null) return BadRequest();
                
            return Ok();
        }

        //Delete: navigator/deleteNode
        [HttpDelete("deleteNode")]
        public async Task<ActionResult> DeleteNode([FromBody] NodeFromServer nodeToDelete)
        {
            var node = new Node()
            {
                Name = nodeToDelete.Name,
                ParentName = nodeToDelete.ParentName,
                Type = nodeToDelete.Type
            };

            if(await _nodeService.RemoveNode(node) == null) return BadRequest();

            return Ok();
        }

        //Post: navigator/createEntry
        [HttpPost("createEntry")]
        public async Task<ActionResult> CreateEntry([FromBody] EntryFromServer newEntry)
        {
            if(await _entryService.AddEntry(newEntry) == null) return BadRequest();

            return Ok();
        }
    }
}
