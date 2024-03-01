using backend.DataAccess.DbPatterns;
using backend.DataAccess.Entity;
using backend.DTO;
using backend.WebNavigator.DTO;
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
        private readonly IEntryFileService _entryFileService;

        public NavigatorController(INodeService nodeService, IEntryService entryService, IEntryFileService entryFileService)
        {
            _nodeService = nodeService;
            _entryService = entryService;
            _entryFileService = entryFileService;
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
        public async Task<ActionResult> CreateNode([FromBody] NodeFromClient newNode)
        {
            var node = new Node()
            {
                Name = newNode.Name,
                ParentName = newNode.ParentName,
                Type = newNode.Type
            };

            await _nodeService.AddNode(node);
            return Ok();
        }

        //Delete: navigator/deleteNode
        [HttpDelete("deleteNode")]
        public async Task<ActionResult> DeleteNode([FromBody] NodeFromClient nodeToDelete)
        {
            var node = new Node()
            {
                Name = nodeToDelete.Name,
                ParentName = nodeToDelete.ParentName,
                Type = nodeToDelete.Type
            };

            await _nodeService.RemoveNode(node);
            return Ok();
        }

        //Post: navigator/createEntry
        [HttpPost("createEntry")]
        public async Task<ActionResult> CreateEntry([FromBody] EntryFromClient newEntry)
        {
            await _entryService.AddEntry(newEntry);
            return Ok();
        }

        //Post: navigator/addEntryContent
        [HttpPost("addEntryContent")]
        public async Task<ActionResult> AddEntryContent([FromBody] EntryFileFromClient entryFileFromClient)
        {
            await _entryFileService.AddContentToEntry(entryFileFromClient);
            return Ok();
        }

        //Get: navigator/getEntryContent
        [HttpGet("getEntryContent")]
        public async Task<ActionResult> GetEntryContent(int entryId)
        {
            var fileEntry = await _entryFileService.GetEntryFile(entryId);
            return Ok(fileEntry);
        }
    }
}
